import React, { useState } from "react";
//import ImageUploader from "./components/imageUploader";
import MatchedSpeciesResults from "./components/MatchedSpeciesResults";
import LandingSection from "./components/LandingPage1";
import "./App.css";

function App() {
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleImageUploadSuccess = (fileName) => {
    setUploadedFileName(fileName);
    console.log("Uploaded File Name:", fileName);
  };

  return (
    <div className="App">

      
      <LandingSection onUploadSuccess={handleImageUploadSuccess} />
      {uploadedFileName && (
        <MatchedSpeciesResults uploadedImageKey={uploadedFileName} />
      )}
    </div>
  );
}

export default App;
