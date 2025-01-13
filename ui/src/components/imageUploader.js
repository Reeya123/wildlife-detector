import React, { useState } from "react";

function ImageUploader() {
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

      // Step 1: Get the presigned URL from the Lambda API Gateway
      const response = await fetch(
        `https://hy6vcyxwth.execute-api.us-east-1.amazonaws.com/prd/generate-presigned-url?filename=${encodeURIComponent(
          fileName)}` , 
          {
            method: 'GET',
            headers: {
              Origin: "http://localhost:3000", // Add this header explicitly
            },
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to get presigned URL");
      }
      console.log('Response Data:', response);
      const { uploadURL } = await response.json();
      console.log('Response Data:', uploadURL);
      // Step 2: Upload the file to S3 using the presigned URL
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type, 
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the file");
      }

      setUploadMessage("File uploaded successfully!");
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
