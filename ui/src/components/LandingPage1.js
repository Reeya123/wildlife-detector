import React from "react";

const LandingSection = () => {
    return(
        
        <section className="bg-darkgreen text-white relative min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-centre px-8 py-4">
                {/*website name */}
                <div className="text-neongreen font-PlayfairDisplay text-xl font-bold">
                    WanderWild
                </div>
                <nav className="flex gap-6 font-Garamond text-xl">
                    <a href="#sample" className="hover:bg-neongreen font-bold rounded-lg transition duration-300 ">Sample</a>
                    <a href="#about" className="hover:bg-neongreen font-bold rounded-lg transition duration-300 ">About</a>

                </nav>

            </header>


            {/*Content*/}
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-8 lg:px-20 py-12 flex-grow relative">
            <div className="lg:w-1/2 space-y-6">
                <h2 className="text-4xl font-PlayfairDisplay lg:text-5xl font-bold ">Why WanderWild?</h2>
                <p className="text-lg font-Lora leading-relaxed">
                    Our tool is designed for anyone with a curiosity about the natural world.
                </p>
                <p className="text-lg font-Lora mb-8">
                    Whether you're a nature enthusiast, a hiker, or a dedicated wildlife explorer, this is your gateway to discovering species from the wild.
                </p>
                <button className="bg-neongreen text-darkgreen px-6 py-3 rounded-lg font-bold hover:bg-yellow-400">
                    Upload Image
                </button>
                <p className="text-lg font-Garamond mb-8">
                    Empowering Every Explorer with Wildlife Knowledge
                </p>
                </div>
                
                {/* Parrot Image */}
                <div className="lg:w-1/2 relative">
                <img
                    src="images/parrot_nobg1.png"  
                    alt="Parrot"
                    className="lg:absolute bottom-0 right-0 w-full lg:w-auto object-contain"
                />
                </div>
            </div>



        </section>
    )
}


export default LandingSection;