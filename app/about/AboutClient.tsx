'use client';

import Faq from "../faq";
import Image from "next/image";
import Footer from "../footer";
import Founders from "../founders";
import Navbar from "../navbar";
import Beneficios from "./beneficios";
import Certifications from "./certificados";
import Numeros from "./numeros";
import Beneficiosabout from "./beneficiosablout";

const AboutClient = () => {
  return (
    <div>
      <Navbar />

      <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <Image
          src="/fondo.jpg"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="relative z-20 h-full flex items-center justify-center px-6 mx-auto max-w-7xl">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16 lg:gap-24">
            <div className="w-full md:w-1/2 text-center md:text-left pt-16 md:pt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-[#E1F5FE] mb-4 drop-shadow-lg">
                Sobre Nosotros 
              </h1>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-base sm:text-xl font-bold lg:text-3xl text-[#E1F5FE] leading-relaxed drop-shadow-md">
                Aquellos que se unen a nuestra comunidad...
              </p>
            </div>
          </div>
        </div>
      </section>

      <Numeros />
      <Beneficios />
      <Beneficiosabout />
      <Founders />
      <Certifications />
      <Faq />
      <Footer />
    </div>
  );
};

export default AboutClient;
