import React, { useEffect, useState } from "react";

const SampleSpecies = ({ setSelectedSpecies, setSelectedSpeciesForDetail }) => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("/data/sampleSpecies.json")
      .then((response) => response.json())
      .then((data) => setSpecies(data))
      .catch((error) => console.error("Error loading species:", error));
  }, []);

  return (
    <section className="relative bg-darkgreen text-white min-h-screen py-12">
        {/* Parrot Image */}
        <div className="absolute -top-48 right-0">
          <img
            src="/images/blueparrot.png" 
            alt="Parrot"
            className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
          />
        </div>
      <h2 className="text-2xl lg:text-4xl font-bold text-center mb-6">
        Popular Species Found on Treks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
        {species.map((item, index) => (
          <div
            key={index}
            className="bg-green-800 border border-yellow-500 shadow-lg rounded-lg p-6 cursor-pointer hover:bg-green-700 transition duration-300"
            onClick={() => setSelectedSpeciesForDetail(item)} // Now moves to Section 4
          >
            <h3 className="text-lg font-bold mb-2 text-yellow-400">{item.SpeciesName}</h3>
            <p className="italic text-sm">{item.ScientificName}</p>
            <p><strong>Habitat:</strong> {item.Habitat}</p>
            <p><strong>Fun Fact:</strong> {item.FunFact}</p>
            <p><strong>Diet:</strong> {item.Diet}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SampleSpecies;
