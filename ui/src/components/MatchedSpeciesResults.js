/*section 2 of ui. Displays species info in a grid layout*/

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const MatchedSpeciesResults = ({ uploadedImageKey }) => {
  const [speciesResults, setSpeciesResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel state
  useEffect(() => {
    if (uploadedImageKey) {
      fetchSpeciesResults(uploadedImageKey);
    }
  }, [uploadedImageKey]);

  const fetchSpeciesResults = async (imageKey) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://hy6vcyxwth.execute-api.us-east-1.amazonaws.com/prd/species-data-fetcher?filename=${encodeURIComponent(
          imageKey
        )}`,
        {
          method: "GET",
        }
      );
      if (response.status === 404) {
        setSpeciesResults([]);
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch species results");
      }

      const data = await response.json();
      setSpeciesResults(data.results || []);
    } catch (err) {
      console.error("Error fetching species results:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    // Navigation functions for carousel
    const nextSpecies = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === speciesResults.length - 1 ? 0 : prevIndex + 1
      );
    };

    const prevSpecies = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? speciesResults.length - 1 : prevIndex - 1
      );
    };

    return (
      <section className="relative bg-white py-12 px-8">
        {/* Lemur Image */}
        <div className="absolute -top-24 left-0">
          <img
            src="/images/Lemur.png"
            alt="Lemur"
            className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
          />
        </div>
    
        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-PlayfairDisplay font-bold  text-darkgreen text-center mb-6">
          Species Matches
        </h2>
    
        {/* Category Buttons */}
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
    
        {loading && <p className="text-center text-green-800">Loading species results...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
    
        {speciesResults.length > 0 && (
          <div className="relative flex items-center justify-center mt-6">
            {/* Left Arrow */}
            <button
              onClick={prevSpecies}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-darkgreen text-4xl p-3 hover:text-neongreen"
            >
              <FaArrowLeft />
            </button>
    
            {/* Species Information in Grid Layout */}
            <div className="bg-white border shadow-lg rounded-lg p-6 flex flex-col items-center w-4/5">
              <h3 className="text-3xl font-bold text-green-800 mb-6">
                {speciesResults[currentIndex].matched_species}
              </h3>
    
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">

              {/* Box 1 */}
              <div 
                className="relative bg-white border-2 border-neongreen p-6 rounded-lg shadow-lg col-span-2 group transition duration-300 ease-in-out 
                hover:bg-cover hover:bg-center hover:text-white" 
                style={{
                  backgroundImage: "none",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundImage = "url('/images/bgplant.jpg')"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundImage = "none"}
              >
                {/* Background Overlay for Readability */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out rounded-lg"></div>


                <div className="relative z-10">
                  <p><strong>Scientific Name:</strong> {speciesResults[currentIndex].metadata.ScientificName}</p>
                  <p><strong>Description:</strong> {speciesResults[currentIndex].metadata.Description}</p>
                  <p><strong>Habitat:</strong> {speciesResults[currentIndex].metadata.Habitat}</p>
                  <p><strong>Size:</strong> {speciesResults[currentIndex].metadata.Size}</p>
                  <p><strong>Lifespan:</strong> {speciesResults[currentIndex].metadata.Lifespan}</p>
                  <p><strong>Category:</strong> {speciesResults[currentIndex].metadata.Category}</p>
                </div>
              </div>


                {/* Box2 */}
                <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                  <p><strong>Migratory Behaviour:</strong> {speciesResults[currentIndex].metadata.MigrationBehavior}</p>
                  <p><strong>Sound:</strong> {speciesResults[currentIndex].metadata.Sound}</p>
                  <p><strong>Diet:</strong> {speciesResults[currentIndex].metadata.Diet}</p>
                  <p><strong>Safety Advice:</strong> {speciesResults[currentIndex].metadata.SafetyAdvice}</p>
                </div>

                {/* Box 3 */}
                <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                  <p><strong>Conservation Status:</strong> {speciesResults[currentIndex].metadata.ConservationStatus}</p>
                  <p><strong>Cultural Significance:</strong> {speciesResults[currentIndex].metadata.CulturalSignificance}</p>
                  <p><strong>Threats:</strong> {speciesResults[currentIndex].metadata.Threats}</p>
                </div>

                {/* Box4 */}
                <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                <p><strong>Fun Details:</strong> {speciesResults[currentIndex].metadata.FunFact}</p>
                <p><strong>Best Time to Spot:</strong> {speciesResults[currentIndex].metadata.BestTimeToSpot}</p>
                </div>
    
                
    
                
                {/* Right Column */}
                <div className="bg-grey border-2 border-neongreen p-6 rounded-lg shadow-lg">
                  <p>should have image!</p>
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
    
        {speciesResults.length === 0 && !loading && !error && (
          <p className="text-center text-green-900 mt-6">No species matched. Please try uploading another image.</p>
        )}
      </section>
    );
    
  };

export default MatchedSpeciesResults;

