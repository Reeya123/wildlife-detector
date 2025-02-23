import React, { useState, useRef } from "react";

const LandingSection = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef(null); // Reference to file input

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input dialog
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload");
      return;
    }

    try {
      const fileName = selectedFile.name;

      // Step 1: Get the presigned URL from API Gateway
      const response = await fetch(
        `https://hy6vcyxwth.execute-api.us-east-1.amazonaws.com/prd/generate-presigned-url?filename=${encodeURIComponent(
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

      const responseBody = await response.json();
      const uploadURL = JSON.parse(responseBody.body).uploadURL;

      // Step 2: Upload file to S3
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload the file");
      }

      setUploadMessage("File uploaded successfully!");
      onUploadSuccess(fileName);
    } catch (error) {
      console.error("Error uploading the file:", error);
      setUploadMessage(`Error: ${error.message}`);
    }
  };

  return (
    <section className="relative bg-darkgreen text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-neongreen font-PlayfairDisplay text-xl font-bold">
          WanderWild
        </div>
        <nav className="flex gap-6 font-Garamond text-xl">
          <a href="#sample" className="hover:bg-neongreen font-bold rounded-lg transition duration-300 px-2">
            Sample
          </a>
          <a href="#about" className="hover:bg-neongreen font-bold rounded-lg transition duration-300 px-2">
            About
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col-reverse lg:flex-row items-start justify-between px-8 lg:px-20 py-12">
        {/* Left Text Column */}
        <div className="lg:w-1/2 space-y-6 text-left">
          <h2 className="text-4xl lg:text-5xl font-PlayfairDisplay font-bold text-left">
            Why WanderWild?
          </h2>
          <p className="text-lg font-Lora leading-relaxed text-left">
            Our tool is designed for anyone with a curiosity about the natural world.
          </p>
          <p className="text-lg font-Lora leading-relaxed ">
            Whether you're a nature enthusiast, a hiker, or a dedicated wildlife explorer, 
            this is your gateway to discovering species from the wild.
          </p>

          {/* Upload Button (Merged with File Input) */}
          <div className="flex items-center gap-4">
            <button
              className="bg-neongreen text-darkgreen px-6 py-3 rounded-lg font-bold text-left 
                         hover:bg-yellow-400 transition duration-300"
              onClick={handleUploadClick} // Click triggers file input
            >
              Upload Image
            </button>
            <span className="text-sm">{selectedFile ? selectedFile.name : "No file chosen"}</span>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Assign ref
            className="hidden" // Hide input field
            onChange={handleFileChange}
          />

          {/* Upload Image */}
          {selectedFile && (
            <button
              className="mt-2 bg-yellow-400 text-darkgreen px-4 py-2 rounded-lg font-bold 
                         hover:bg-yellow-500 transition duration-300"
              onClick={uploadImage}
            >
              Confirm & Upload
            </button>
          )}

          {uploadMessage && <p className="text-white mt-2">{uploadMessage}</p>}

          <p className="text-lg font-Garamond text-left">
            Empowering Every Explorer with Wildlife Knowledge
          </p>
        </div>

        {/* Parrot Image */}
        <div className="lg:w-1/2 relative mb-8 lg:mb-0">
          <img
            src="images/parrot_nobg1.png"
            alt="Parrot"
            className="w-[60vw] max-w-[1000px] lg:max-w-[1000px] mx-auto 
                       lg:absolute lg:-top-20 lg:-right-11 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
