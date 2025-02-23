import React from "react";

const SpeciesDetail = ({ species, goBack }) => {
  return (
    <section className="relative bg-darkgreen text-white min-h-screen flex flex-col items-center justify-center px-8 py-12">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="absolute top-8 left-8 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition duration-300"
      >
        ← Back
      </button>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full max-w-6xl">
        {/* Side Fox Images */}
        <div className="flex flex-col gap-4">
          <img src={species.ImageURL} alt="Fox 1" className="w-28 h-28 rounded-lg shadow-lg" />
          <img src={species.ImageURL} alt="Fox 2" className="w-28 h-28 rounded-lg shadow-lg" />
          <img src={species.ImageURL} alt="Fox 3" className="w-28 h-28 rounded-lg shadow-lg" />
          <img src={species.ImageURL} alt="Fox 4" className="w-28 h-28 rounded-lg shadow-lg" />
        </div>

        {/* Main Species Image */}
        <div className="relative">
          <img
            src={species.ImageURL}
            alt={species.SpeciesName}
            className="w-[300px] h-[300px] object-contain mx-auto shadow-lg rounded-full border-4 border-yellow-400"
          />
        </div>

        {/* Species Info */}
        <div className="text-left mt-6">
          <h2 className="text-4xl font-bold text-yellow-400">{species.SpeciesName}</h2>
          <p className="italic text-lg">{species.ScientificName}</p>
          <p className="mt-4 max-w-2xl">{species.Description}</p>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 max-w-4xl">
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <p><strong>Habitat:</strong> {species.Habitat}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <p><strong>Diet:</strong> {species.Diet}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <p><strong>Fun Fact:</strong> {species.FunFact}</p>
            </div>
            <div className="bg-green-700 p-4 rounded-lg shadow-lg">
              <p><strong>Conservation Status:</strong> {species.ConservationStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeciesDetail;
