import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MatchedSpeciesResults = ({ uploadedImageKey }) => {
  const [speciesResults, setSpeciesResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (uploadedImageKey) {
      fetchSpeciesResults(uploadedImageKey);
    } else {
      setSpeciesResults([]);
    }
  }, [uploadedImageKey]);

  const fetchSpeciesResults = async (imageKey) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://hy6vcyxwth.execute-api.us-east-1.amazonaws.com/prd/species-data-fetcher?filename=${encodeURIComponent(imageKey)}`
      );

      if (response.status === 404) {
        setSpeciesResults([]);
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch species results");

      const data = await response.json();
      setSpeciesResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextSpecies = () => {
    setCurrentIndex((prev) => (prev + 1) % speciesResults.length);
  };

  const prevSpecies = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? speciesResults.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative bg-white py-12 px-8 min-h-screen">
      {/* Lemur Image Always Shown */}
      <div className="absolute -top-24 left-0">
        <img
          src="/images/Lemur.png"
          alt="Lemur"
          className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
        />
      </div>

      {/* Title Always Shown */}
      <h2 className="text-3xl lg:text-4xl font-PlayfairDisplay font-bold text-darkgreen text-center mb-6">
        Species Matches
      </h2>

      {/* Category Buttons (always shown) */}
      <div className="flex justify-center gap-4 mb-8">
        <button className="px-6 py-2 text-darkgreen text-2xl font-Garamond font-bold rounded-md hover:bg-neongreen transition">
          Mammals
        </button>
        <button className="px-6 py-2 text-darkgreen text-2xl font-Garamond font-bold rounded-md hover:bg-neongreen transition">
          Birds
        </button>
        <button className="px-6 py-2 text-darkgreen text-2xl font-Garamond font-bold rounded-md hover:bg-neongreen transition">
          Plants
        </button>
      </div>

      {/* Prompt message if no image uploaded */}
      {!uploadedImageKey && (
        <p className="text-center text-neongreen font-Garamond text-xl mt-12">
          Upload an image to see species details.
        </p>
      )}

      {/* Loading and Error Handling */}
      {loading && <p className="text-center text-green-800">Loading species results...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* Species Results Display */}
      {speciesResults.length > 0 && (
        <div className="relative flex items-center justify-center mt-6">
          {/* Left Arrow */}
          <button
            onClick={prevSpecies}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-darkgreen text-4xl p-3 hover:text-neongreen"
          >
            <FaArrowLeft />
          </button>

          {/* Species Details */}
          <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center w-4/5">
            <h3 className="text-3xl font-bold text-green-800 mb-6">
              {speciesResults[currentIndex].matched_species}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {/* Detailed boxes go here as per your existing layout */}
              <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg col-span-2">
                <p><strong>Scientific Name:</strong> {speciesResults[currentIndex].metadata.ScientificName}</p>
                <p><strong>Description:</strong> {speciesResults[currentIndex].metadata.Description}</p>
                <p><strong>Habitat:</strong> {speciesResults[currentIndex].metadata.Habitat}</p>
                <p><strong>Size:</strong> {speciesResults[currentIndex].metadata.Size}</p>
                <p><strong>Lifespan:</strong> {speciesResults[currentIndex].metadata.Lifespan}</p>
                <p><strong>Category:</strong> {speciesResults[currentIndex].metadata.Category}</p>
              </div>
              <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                <p><strong>Migratory Behaviour:</strong> {speciesResults[currentIndex].metadata.MigrationBehavior}</p>
                <p><strong>Sound:</strong> {speciesResults[currentIndex].metadata.Sound}</p>
                <p><strong>Diet:</strong> {speciesResults[currentIndex].metadata.Diet}</p>
                <p><strong>Safety Advice:</strong> {speciesResults[currentIndex].metadata.SafetyAdvice}</p>
              </div>
              <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                <p><strong>Conservation Status:</strong> {speciesResults[currentIndex].metadata.ConservationStatus}</p>
                <p><strong>Cultural Significance:</strong> {speciesResults[currentIndex].metadata.CulturalSignificance}</p>
                <p><strong>Threats:</strong> {speciesResults[currentIndex].metadata.Threats}</p>
              </div>
              <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                <p><strong>Fun Details:</strong> {speciesResults[currentIndex].metadata.FunFact}</p>
                <p><strong>Best Time to Spot:</strong> {speciesResults[currentIndex].metadata.BestTimeToSpot}</p>
              </div>
              <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                <img src={speciesResults[currentIndex].metadata.ImageURL} alt={speciesResults[currentIndex].matched_species} />
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSpecies}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-darkgreen text-4xl p-3 hover:text-neongreen"
          >
            <FaArrowRight />
          </button>
        </div>
      )}

      {speciesResults.length === 0 && uploadedImageKey && !loading && !error && (
        <p className="text-center text-green-900 mt-6">
          No species matched. Please try uploading another image.
        </p>
      )}
      
    </section>
  );
};

export default MatchedSpeciesResults;
