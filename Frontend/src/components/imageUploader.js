import React, { useState } from "react";

function ImageUploader({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    try {
      const fileName = selectedFile.name;
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL; // Fetching from env

      // Step 1: Get the presigned URL from the Lambda API Gateway
      const response = await fetch(
        `${apiBaseUrl}/generate-presigned-url?filename=${encodeURIComponent(
          fileName
        )}&contentType=${encodeURIComponent(selectedFile.type)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch presigned URL:", response.status, response.statusText);
        throw new Error("Failed to get presigned URL");
      }

      // Parse the raw response
      const responseBody = await response.json();
      console.log("Raw Response Body:", responseBody);

      // Extract the presigned URL from the response
      const uploadURL = JSON.parse(responseBody.body).uploadURL; // Properly parse the JSON-encoded body
      console.log("Presigned URL:", uploadURL);

      // Step 2: Upload the file to S3 using the presigned URL
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        console.error("Failed to upload file:", uploadResponse.status, uploadResponse.statusText);
        throw new Error("Failed to upload the file");
      }

      setUploadMessage("File uploaded successfully!");
      onUploadSuccess(fileName); // Pass the uploaded file name to the parent component
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default ImageUploader;
