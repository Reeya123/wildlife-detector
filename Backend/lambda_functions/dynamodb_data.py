import json
import boto3
import urllib.parse

# Initialize DynamoDB and S3 clients
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

# Update with your DynamoDB table name
TABLE_NAME = 'SpeciesMetadata'
table = dynamodb.Table(TABLE_NAME)

def lambda_handler(event, context):
    try:
        # Check if 'Records' exists in the event
        if 'Records' not in event:
            raise ValueError("No 'Records' found in the event")

        # Extract bucket name and object key from the event
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'])

        # Get the JSON file from S3
        response = s3.get_object(Bucket=bucket, Key=key)
        content = response['Body'].read().decode('utf-8')

        # Parse the JSON content
        species_data = json.loads(content)

        # Insert each species record into DynamoDB
        for species in species_data:
            table.put_item(Item=species)
            print(f"Successfully inserted: {species['SpeciesName']}")

        return {
            'statusCode': 200,
            'body': json.dumps('Data successfully inserted into DynamoDB!')
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }
