import React from "react";

const LandingSection = () => {
  return (
    <section className="relative bg-darkgreen text-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4">
        <div className="text-neongreen font-PlayfairDisplay text-xl font-bold">
          WanderWild
        </div>
        <nav className="flex gap-6 font-Garamond text-xl">
          <a
            href="#sample"
            className="hover:bg-neongreen font-bold rounded-lg transition duration-300 px-2"
          >
            Sample
          </a>
          <a
            href="#about"
            className="hover:bg-neongreen font-bold rounded-lg transition duration-300 px-2"
          >
            About
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col-reverse lg:flex-row items-start justify-between px-8 lg:px-20 py-12">
        {/* Left Text Column */}
        <div className="lg:w-1/2 space-y-6 text-left">
          <h2 className="text-4xl lg:text-5xl font-PlayfairDisplay font-bold text-left">
            Why WanderWild?
          </h2>
          <p className="text-lg font-Lora leading-relaxed text-left">
            Our tool is designed for anyone with a curiosity about the natural
            world.
          </p>
          <p className="text-lg font-Lora leading-relaxed ">
            Whether you&apos;re a nature enthusiast, a hiker, or a dedicated
            wildlife explorer, this is your gateway to discovering species from
            the wild.
          </p>
          <button className="bg-neongreen text-darkgreen px-6 py-3 rounded-lg font-bold  text-left hover:bg-yellow-400 transition duration-300">
            Upload Image
          </button>
          <p className="text-lg font-Garamond text-left">
            Empowering Every Explorer with Wildlife Knowledge
          </p>
        </div>

        {/* Parrot Image */}
        <div className="lg:w-1/2 relative mb-8 lg:mb-0">
          <img
            src="images/parrot_nobg1.png"
            alt="Parrot"
            className="
              w-full 
              max-w-md 
              mx-auto 
              lg:w-auto 
              lg:max-w-none 
              lg:absolute 
              object-contain
              lg:-top-20    /* pushes it upward on large screens */
              lg:-right-11  /* shifts it to the right on large screens */
            "
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
