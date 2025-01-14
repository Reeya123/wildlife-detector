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

  if (loading) return <p>Loading species results...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="matched-species-container">
      <h2>Matched Species Results</h2>
      {speciesResults.length === 0 ? (
        <p>No species matched.</p>
      ) : (
        <div className="species-list">
          {speciesResults.map((species, index) => (
            <div key={index} className="species-card">
              <h3>{species.matched_species}</h3>
              <p><strong>Label:</strong> {species.label}</p>
                <p><strong>Fun Fact:</strong> {species.metadata.FunFact}</p>
                <p><strong>Threats:</strong> {species.metadata.Threats}</p>
                <p><strong>Cultural Significance:</strong> {species.metadata.CulturalSignificance}</p>
                <p><strong>Scientific Name:</strong> {species.metadata.ScientificName}</p>
                <p><strong>Species Name:</strong> {species.metadata.SpeciesName}</p>
                <p><strong>Safety Advice:</strong> {species.metadata.SafetyAdvice}</p>
                <p><strong>Description:</strong> {species.metadata.Description}</p>
                <p><strong>Best Time to Spot:</strong> {species.metadata.BestTimeToSpot}</p>
                <p><strong>Conservation Status:</strong> {species.metadata.ConservationStatus}</p>
                <p><strong>Size:</strong> {species.metadata.Size}</p>
                <p><strong>Habitat:</strong> {species.metadata.Habitat}</p>
                <p><strong>Lifespan:</strong> {species.metadata.Lifespan}</p>
                <p><strong>Diet:</strong> {species.metadata.Diet}</p>
                <p><strong>Migration Behavior:</strong> {species.metadata.MigrationBehavior}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchedSpeciesResults;
