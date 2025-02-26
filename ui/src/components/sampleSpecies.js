import React, { useEffect, useState } from "react";

const SampleSpecies = ({ setSelectedSpeciesForDetail }) => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetch("/data/sampleSpecies.json")
      .then((response) => response.json())
      .then((data) => setSpecies(data))
      .catch((error) => console.error("Error loading species:", error));
  }, []);

  return (
    <section className="relative bg-darkgreen text-white min-h-screen py-12 px-8">
      <div className="absolute  -top-44 right-0">
        <img
          src="/images/blueparrot.png"
          alt="Parrot"
          className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
        />
      
      </div>

      <h2 className="text-3xl lg:text-4xl font-Garamond font-bold text-center mb-8">
        Popular Species Found on Treks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {species.map((item, index) => (
    <div
      key={index}
      className="relative bg-darkgreen border-2 border-yellow-400 shadow-lg rounded-lg cursor-pointer transition duration-500 overflow-hidden group"
      onClick={() => setSelectedSpeciesForDetail(item)}
    >
      {/* Background Image on Hover */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundImage: `url('/images/cardbg.png')`, // Replace with your background image
        }}
      ></div>

      {/* Text Absolute Positioned */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 text-centerpx-4 py-1 rounded">
        <h3 className="text-xl font-PlayfairDisplay font-bold">{item.SpeciesName}</h3>
        <p className="font-Garamond text-lg">{item.Category}</p>
      </div>

      {/* Image Container */}
      <div className="w-full h-56 overflow-hidden relative">
        <img
          src={item.ImageURL}
          alt={item.SpeciesName}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 scale-125 transition-transform duration-500 ease-in-out 
          group-hover:translate-y-0 group-hover:scale-100 object-cover"
        />
      </div>
    </div>
  ))}
</div>

      
    </section>
  );
};

export default SampleSpecies;
