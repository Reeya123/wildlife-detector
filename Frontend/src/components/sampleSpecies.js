import React, { useEffect, useState } from "react";

const SampleSpecies = ({ setSelectedSpeciesForDetail }) => {
  const [species, setSpecies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle collapsible card
  };

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
            className={`relative flex flex-col items-center cursor-pointer transition-all duration-500 group 
              bg-darkgreen border border-yellow-500 shadow-lg rounded-lg w-80 h-86`} // **Set fixed width & height**
            onClick={() => setSelectedSpeciesForDetail(item)}
          >
            {/* Species Image */}
            <div className="w-full h-56 overflow-hidden rounded-t-lg">
              <img
                src={item.ImageURL}
                alt={item.SpeciesName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Header */}
            <div className="flex flex-col justify-between flex-1 w-full px-6 py-4 bg-dark-moss-green text-cornsilk">
              <div>
                <h3 className="text-xl font-bold">{item.SpeciesName}</h3>
                <p className="text-sm text-earth-yellow">{item.Category}</p>
              </div>
              <span
                className={`text-earth-yellow text-2xl transform ${
                  activeIndex === index ? "rotate-45" : "rotate-0"
                } transition-transform self-end`}
              >
                
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SampleSpecies;
