import React, { useState } from "react";
import MatchedSpeciesResults from "./components/MatchedSpeciesResults";
import LandingSection from "./components/LandingPage1";
import SampleSpecies from "./components/sampleSpecies";
import SpeciesDetail from "./components/speciesDetails";
import "./App.css";

function App() {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedSpeciesForDetail, setSelectedSpeciesForDetail] = useState(null);

  const handleImageUploadSuccess = (fileName) => {
    setUploadedFileName(fileName);
    console.log("Uploaded File Name:", fileName);
  };

  return (
    <div className="App">
      {/* Landing Section (Section 1) */}
      <LandingSection onUploadSuccess={handleImageUploadSuccess} />

      {/* Matched Species Results Section (Section 2 always visible) */}
      <MatchedSpeciesResults 
        uploadedImageKey={uploadedFileName} 
        selectedSpecies={selectedSpecies} 
      />

      {/* Show Sample Species Section (Section 3) only if Section 4 is NOT active */}
      {!selectedSpeciesForDetail && (
        <SampleSpecies 
          setSelectedSpecies={setSelectedSpecies} 
          setSelectedSpeciesForDetail={setSelectedSpeciesForDetail} 
        />
      )}

      {/* Show Species Detail Section (Section 4) when a species is selected */}
      {selectedSpeciesForDetail && (
        <SpeciesDetail 
          species={selectedSpeciesForDetail} 
          goBack={() => setSelectedSpeciesForDetail(null)} 
        />
      )}
    </div>
  );
}

export default App;
