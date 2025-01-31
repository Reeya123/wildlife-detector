/*section 2 of ui. Displays species info in a grid layout*/

import React, { useEffect, useState } from "react";

const MatchedSpeciesResults = ({ uploadedImageKey }) => {
  const [speciesResults, setSpeciesResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <section className="bg-green-100 py-12 px-8">
      <h2 className="text-2xl lg:text-4xl font-bold text-green-900 mb-6">
        Species Matches
      </h2>
      <div className="text-lg flex justify-center gap-4 mb-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Mammals
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Birds
        </button>
        <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
          Plants
        </button>
      </div>

      {loading && <p>Loading species results...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {speciesResults.length === 0 ? (
          <p>No species matched. Please try uploading another image.</p>
        ) : (
          speciesResults.map((species, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-green-800">
                {species.matched_species}
              </h3>
              <p>
                <strong>Scientific Name:</strong> {species.metadata.ScientificName}
              </p>
              <p>
                <strong>Description:</strong> {species.metadata.Description}
              </p>
              <p>
                <strong>Fun Fact:</strong> {species.metadata.FunFact}
              </p>
              <p>
                <strong>Habitat:</strong> {species.metadata.Habitat}
              </p>
              <p>
                <strong>Conservation Status:</strong>{" "}
                {species.metadata.ConservationStatus}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MatchedSpeciesResults;
