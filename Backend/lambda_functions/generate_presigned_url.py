import boto3
import json

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event)}")  # Debugging log

    # Check if 'queryStringParameters' exists
    if 'queryStringParameters' not in event or 'filename' not in event['queryStringParameters']:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Filename is required"})
        }

    file_name = event['queryStringParameters']['filename']
    bucket_name = 'wildlife-images-bucket'
    content_type = event['queryStringParameters'].get('contentType', 'image/jpeg')
    print(f"Filename: {file_name}, Content-Type: {content_type}")
    try:
        # Generate the presigned URL with the Content-Type parameter
        s3_client = boto3.client('s3')
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={'Bucket': bucket_name, 'Key': file_name, 'ContentType': content_type},
            ExpiresIn=3600
        )

        # Return response with CORS headers
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps({'uploadURL': presigned_url}),
        }

    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
