'use client';
import Faq from "../faq";

import Image from "next/image"; // Import Image from Next.js for optimized images
import Footer from "../footer";
import Founders from "../founders";
import Navbar from "../navbar"; // Assuming your Navbar component path is correct
import Beneficios from "./beneficios";
import Certifications from "./certificados";
import Numeros from "./numeros";

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section: Simulating "Sobre Harvard" layout */}
      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {/* Background Image - Replace with your desired image */}
        <Image
          src="/fondo.jpg" // **IMPORTANT: Replace with your actual image path**
          alt="Background image of JEDteam campus or inspiring scene"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          className="z-0"
        />

        {/* Overlay to darken the image and improve text readability */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Content Container */}
        <div className="relative z-20 h-full flex items-center justify-center px-6 mx-auto max-w-7xl">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 lg:gap-24">
            {/* Left Column: Title "Sobre Harvard" inspired */}
            <div className="w-full md:w-1/2 text-center md:text-left pt-16 md:pt-0"> {/* Added padding top for aesthetic spacing from navbar */}
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-[#E1F5FE] mb-4 drop-shadow-lg">
                Sobre Nosotros 
              </h1>
            </div>

            {/* Right Column: Description Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-base sm:text-xl font-bold lg:text-3xl text-[#E1F5FE] leading-relaxed drop-shadow-md">
                Aquellos que se unen a nuestra comunidad para aprender, investigar, enseñar, trabajar y crecer—
                se unen a casi cuatro siglos de estudiantes y académicos en la búsqueda de la verdad, el
                conocimiento y un mundo mejor.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Numeros/>
      <Beneficios />
      <Founders />
      <Certifications/>
       <Faq />
      
      <Footer/>
    </div>
  );
};

export default About;