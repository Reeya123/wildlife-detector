# Wildlife Detector - AWS Lambda Functions

##  Overview
This repository contains AWS Lambda functions used in the Wildlife Detector application. These functions facilitate image uploads, species recognition, and data retrieval by interacting with S3, DynamoDB, and API Gateway.


### Architecture Overview
Frontend: Built with Next.js & Tailwind CSS, enabling an interactive UI for users.
Backend: Serverless architecture using AWS Lambda, API Gateway, S3, and DynamoDB.
Database: Species metadata stored in DynamoDB for quick retrieval.
Image Processing: Amazon Rekognition analyzes images uploaded to S3.

### Lambda Functions
The backend consists of three AWS Lambda functions:  

####  `generate_presigned_url.py`
This function generates a presigned URL for uploading images to an S3 bucket.

####  How It Works:
1. A **GET request** is sent to the API Gateway with a `filename` parameter.
2. The Lambda function returns a **presigned URL** for S3 upload.
3. The frontend uploads the image using the presigned URL.

####  Example API Request:
```bash
curl -X GET "https://<api-id>.execute-api.us-east-1.amazonaws.com/prd/generate-presigned-url?filename=example.jpg"


####  `species_data_fetcher.py`  
- This function retrieves species data by processing images uploaded to S3 using Amazon Rekognition.  

####  How It Works:
User uploads an image → Stored in S3, triggering this Lambda function.
Amazon Rekognition → Detects species labels from the uploaded image.
DynamoDB Query → Retrieves metadata for the detected species.
Response → Returns species name, conservation status, habitat, and fun facts.

####  Example API Request:
```bash
curl -X GET "https://<api-id>.execute-api.us-east-1.amazonaws.com/prd/species-data-fetcher?filename=example.jpg"


####   dynamodb_data.py
- This function interacts with the DynamoDB database, storing and retrieving species metadata.  

####  How It Works:
Populates DynamoDB with species information.
Allows querying species details such as scientific name, conservation status, habitat, and fun facts.
Enhances search by enabling fuzzy matching for better species identification.


## Architecture & AWS Services Used  
The **Wildlife Detector** backend is built using a **serverless architecture** with the following AWS services:  

- **AWS Lambda**: Processes image uploads and fetches species data.  
- **Amazon S3**: Stores images uploaded by users.  
- **Amazon Rekognition**: Identifies species from uploaded images.  
- **Amazon DynamoDB**: Stores species metadata, including scientific names, conservation status, and cultural significance.  
- **API Gateway**: Exposes API endpoints to interact with the backend functions.  

## How It All Comes Together!  

### 1. Uploading an Image  
1. A **GET request** is sent to API Gateway with a `filename` parameter.  
2. The Lambda function (`generate_presigned_url.py`) returns a **presigned URL** for S3 upload.  
3. The frontend uploads the image using the presigned URL.  

### 2. Processing the Image  
1. When an image is uploaded to **S3**, it triggers `species_data_fetcher.py`.  
2. This function calls **Amazon Rekognition** to detect labels/species.  
3. The function then queries **DynamoDB** to find matching species metadata.  
4. The metadata is returned to the frontend via **API Gateway**.  

### 3. Fetching Species Data  
1. The frontend makes a **GET request** to fetch species details using API Gateway.  
2. The `species_data_fetcher.py` Lambda function retrieves the relevant metadata from **DynamoDB**.  

