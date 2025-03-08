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
    <section className="relative bg-darkgreen text-white min-h-screen py-16 px-8">
      {/* Floating Parrot Image */}
      <div className="absolute -top-36 right-0">
        <img
          src="/images/blueparrot.png"
          alt="Parrot"
          className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
        />
      </div>

      {/* Section Title */}
      <h2 className="text-5xl font-PlayfairDisplay font-bold text-center mb-16 tracking-wide">
        Popular Species Found on Treks
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        {species.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 cursor-pointer transition-all duration-500 group"
            onClick={() => setSelectedSpeciesForDetail(item)}
          >
            {/* Circular Background Wrapper */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 transition-all duration-500">
              {/* Circle Background */}
              <div className="absolute inset-0 bg-neongreen rounded-full shadow-lg transition-all duration-500 group-hover:bg-yellow-300 z-0" />

              {/* Species Image - Ensures Image is Properly Contained */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <img
                  src={item.ImageURL}
                  alt={item.SpeciesName}
                  className="w-full h-full object-contain transition-all duration-500 ease-in-out 
                             group-hover:scale-125 group-hover:-translate-y-6"
                />
              </div>
            </div>

            {/* Species Name & Category */}
            <div className="text-center">
              <h3 className="text-2xl font-bold">{item.SpeciesName}</h3>
              <p className="text-lg font-Garamond opacity-90">{item.Category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SampleSpecies;
