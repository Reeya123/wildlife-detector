import React from "react";
import { FaRuler, FaLeaf, FaPaw, FaGlobeAmericas } from "react-icons/fa"; // Icons

const SpeciesDetail = ({ species, goBack }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${species.ImageURL})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      {/* Back Button */}
      <button
        onClick={goBack}
        className="absolute top-8 left-8 bg-neonGreen text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition duration-300"
      >
        ← Back
      </button>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex w-full max-w-6xl px-12">
        {/* Left Side: Title & Description */}
        <div className="flex-1">
          <h1 className="text-6xl font-bold uppercase">
            {species.SpeciesName}
          </h1>
          <p className="text-2xl italic text-neonGreen">{species.ScientificName}</p>
          <p className="mt-4 text-lg max-w-xl">{species.Description}</p>
        </div>

        {/* Right Side: Key Information - Vertical List */}
        <div className="flex flex-col items-start gap-6 mt-4">
          <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-4">
            <FaRuler className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-lg font-bold uppercase">Size</p>
              <p>{species.Size}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-4">
            <FaPaw className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-lg font-bold uppercase">Known For</p>
              <p>{species.FunFact}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-4">
            <FaLeaf className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-lg font-bold uppercase">Diet</p>
              <p>{species.Diet}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-l-4 border-yellow-500 pl-4">
            <FaGlobeAmericas className="text-yellow-400 text-3xl" />
            <div>
              <p className="text-lg font-bold uppercase">Habitat</p>
              <p>{species.Habitat}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeciesDetail;
