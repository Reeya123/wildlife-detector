# Wildlife Detector - AWS Lambda Functions

##  Overview
This repository contains the AWS Lambda function used in the Wildlife Detector application.

###  `generate_presigned_url.py`
This function generates a presigned URL for uploading images to an S3 bucket.

####  How It Works:
1. A **GET request** is sent to the API Gateway with a `filename` parameter.
2. The Lambda function returns a **presigned URL** for S3 upload.
3. The frontend uploads the image using the presigned URL.

####  Example API Request:
```bash
curl -X GET "https://<api-id>.execute-api.us-east-1.amazonaws.com/prd/generate-presigned-url?filename=example.jpg"
