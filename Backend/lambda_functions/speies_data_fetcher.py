import boto3
import json
import os
import urllib.parse

# Initialize AWS clients
rekognition_client = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('SpeciesMetadata')
s3_client = boto3.client('s3')

# Load generic terms from the JSON file
def load_generic_terms():
    """Load generic terms from the deployment package."""
    try:
        file_path = os.path.join(os.path.dirname(__file__), 'generic_terms.json')
        with open(file_path, 'r') as f:
            generic_data = json.load(f)
        return set(generic_data['generic_terms'])
    except Exception as e:
        print(f"Error loading generic terms: {str(e)}")
        raise

def detect_general_labels(bucket, key):
    """Call Rekognition to detect labels."""
    try:
        response = rekognition_client.detect_labels(
            Image={'S3Object': {'Bucket': bucket, 'Name': key}},
            MaxLabels=10
        )
        return response['Labels']
    except Exception as e:
        print(f"Error in detect_general_labels: {str(e)}")
        raise

def get_all_species_names():
    """Retrieve all species names from the DynamoDB table."""
    try:
        response = table.scan(ProjectionExpression='SpeciesName')
        return [item['SpeciesName'] for item in response.get('Items', [])]
    except Exception as e:
        print(f"Error fetching species names: {str(e)}")
        raise

def advanced_fuzzy_search(label_name, all_species):
    """Return all species names that contain the label as a token."""
    label_tokens = label_name.lower().split()
    matching_species = []

    for species in all_species:
        species_tokens = species.lower().split()
        if any(token in species_tokens for token in label_tokens):
            matching_species.append(species)

    return matching_species

def should_skip_label(label_name, generic_terms):
    """Determine if the label should be skipped based on generic terms."""
    if label_name.lower() in generic_terms:
        #print(f"Skipping generic term: {label_name}")
        return True
    return False

def get_species_metadata(species_name):
    """Query DynamoDB for species metadata."""
    try:
        #print(f"Querying DynamoDB for species: {species_name}")
        response = table.query(
            IndexName='SpeciesName-index',  # Ensure the GSI is properly created
            KeyConditionExpression=boto3.dynamodb.conditions.Key('SpeciesName').eq(species_name)
        )
        if response['Items']:
            #print(f"Found metadata in DynamoDB: {response['Items'][0]}")
            return response['Items'][0]
        else:
            print(f"No metadata found for {species_name} in DynamoDB.")
        return None
    except Exception as e:
        print(f"Error in get_species_metadata: {str(e)}")
        raise

def lambda_handler(event, context):
    # Log the incoming event for debugging
    print(f"Received event: {json.dumps(event)}")

    try:
        if 'Records' in event:
            # Handle S3 Event
            print("Processing S3 event")
            bucket = event['Records'][0]['s3']['bucket']['name']
            key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'])

        elif 'queryStringParameters' in event and event['queryStringParameters']:
            # Handle API Gateway Event
            print("Processing API Gateway event")
            
            # Retrieve the bucket and filename from query string parameters
            bucket = 'wildlife-images-bucket'  # Replace with your actual bucket name
            filename = event['queryStringParameters'].get('filename')
            
            if not filename:
                raise KeyError("Filename not provided in query string parameters")
            
            key = filename
        else:
            # Log the unexpected event structure
            print(f"Unexpected event format: {json.dumps(event)}")
            raise KeyError("Event format not supported")
        # Common Processing Logic
        print(f"Bucket: {bucket}, Key: {key}")


        
        # Load generic terms
        generic_terms = load_generic_terms()

        # Detect labels using Rekognition
        labels = detect_general_labels(bucket, key)
        print(f"Detected labels: {labels}")

        # Retrieve all species names from DynamoDB
        all_species = get_all_species_names()

        # Process labels and search for matches in DynamoDB
        results = []
        for label in labels:
            label_name = label['Name']

            if should_skip_label(label_name, generic_terms):
                continue  # Skip generic labels

            # Use advanced fuzzy search to find potential matches
            matching_species = advanced_fuzzy_search(label_name, all_species)
            if matching_species:
                for species in matching_species:
                    species_metadata = get_species_metadata(species)
                    if species_metadata:
                        result = {
                            'label': label_name,
                            'matched_species': species,
                            'metadata': species_metadata
                        }
                        results.append(result)

                # End the search once all matches for the label are found
                break

        # If matches found, return them
        if results:
            print(f"Matched species results: {json.dumps(results)}")
            return {
            "statusCode": 200,
            "body": json.dumps({"message": "Processing completed", "bucket": bucket, "key": key , "results": results})
        }

        # If no matches found
        return {
            'statusCode': 404,
            'body': json.dumps({
                'error': 'No matching species found',
                'labels': [label['Name'] for label in labels]
            })
        }

    except KeyError as e:
        print(f"KeyError: {str(e)}")
        return {'statusCode': 400, 'body': json.dumps({'error': f'Missing key: {str(e)}'})}
    except Exception as e:
        print(f"Exception: {str(e)}")
        return {'statusCode': 500, 'body': json.dumps({'error': f'Exception: {str(e)}'})}
