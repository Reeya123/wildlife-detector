import React from "react";
import { motion } from "framer-motion";
import { FaRuler, FaLeaf, FaPaw, FaGlobeAmericas } from "react-icons/fa"; // Icons

const SpeciesDetail = ({ species, goBack }) => {
  return (
    <section className="relative min-h-screen flex items-center text-white overflow-hidden px-12">
      {/* Parrot Image */}
      <div className="absolute -top-48 right-0">
          <img
            src="/images/blueparrot.png" 
            alt="Parrot"
            className="w-48 md:w-56 lg:w-64 drop-shadow-lg"
          />
        </div>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${species.ImageURL})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      {/* Back Button */}
      <motion.button
        onClick={goBack}
        className="bg-neongreen absolute top-8 left-8 text-black px-6 py-2 rounded-lg font-bold hover:bg-darkgreen transition duration-300"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        ← Back
      </motion.button>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex w-full max-w-7xl justify-between items-center">
        
        {/* Left Side: Title & Description */}
        <div className="flex-1 text-left">
          {/* Animated Title */}
          <motion.h1
            className="text-7xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            {species.SpeciesName}
          </motion.h1>

          {/* Scientific Name */}
          <motion.p
            className="text-2xl italic text-neonGreen"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {species.ScientificName}
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-4 text-lg max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {species.Description}
          </motion.p>
        </div>

        {/* Right Side: Key Information - Align Right & Left-aligned text */}
        <motion.div
          className="flex flex-col items-end gap-6 mt-4 text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Info Boxes */}
          {[ 
            { icon: <FaRuler />, label: "Size", value: species.Size },
            { icon: <FaPaw />, label: "Known For", value: species.FunFact },
            { icon: <FaLeaf />, label: "Diet", value: species.Diet },
            { icon: <FaGlobeAmericas />, label: "Habitat", value: species.Habitat },
          ].map((info, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 border-l-4 border-yellow-500 pl-4 w-64"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
            >
              <div className="text-yellow-400 text-3xl">{info.icon}</div>
              <div>
                <p className="text-lg font-bold uppercase">{info.label}</p>
                <p>{info.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpeciesDetail;
