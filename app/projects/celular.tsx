"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Path for the QR code image that appears on the phone
const qrCodeImage = "/qr.png"; // Replace with your actual QR code image

const Celular = () => {
  // Define animation variants for Framer Motion
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
    hover: {
      scale: 1.03,
      rotate: 2,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants for the Call to Action section
  const ctaVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.4 }, // Delay to animate after previous sections
    },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 300 } }, // Button hover
  };

  return (
    <section className="bg-[#E1F5FE] py-24 md:py-36 overflow-hidden">
      {/* Main content: Text and Phone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 mb-24 md:mb-36">
        {/* Left Section: Text Content with Framer Motion */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#26374c] mb-6 leading-tight drop-shadow-sm">
            Muestra tus proyectos
          </h2>
          <p className="text-lg md:text-xl text-[#26374c] mb-8 max-w-md">
            Tus certificados vienen con un código QR que llevará a la última
            versión de tu proyecto de curso. Así todos verán lo que sabes hacer.
          </p>
        </motion.div>
        {/* Right Section: Phone Mockup with QR Code and Framer Motion */}
        <motion.div
          className="relative w-64 md:w-80 h-[480px] md:h-[600px] bg-gray-100 rounded-[2.5rem] shadow-xl border-[10px] border-gray-900 flex flex-col items-center pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={phoneVariants}
          whileHover="hover"
        >
          {/* Phone Speaker/Camera Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-800 rounded-b-xl"></div>
          {/* Phone Screen Area */}
          <div className="relative w-[90%] h-[calc(100%-4rem)] bg-white rounded-2xl overflow-hidden shadow-inner">
            {/* Mockup Header within phone screen */}
            <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                asociacióndeenfermeros/proyecto
              </span>
              <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>{" "}
              {/* Placeholder for menu icon */}
            </div>

            {/* QR Code section */}
            <div className="flex flex-col items-center justify-center p-4 bg-white">
              <h3 className="text-sm font-semibold text-[#26374c] mb-2">
                Tu proyecto de curso
              </h3>
              <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white border border-gray-300 rounded-lg flex items-center justify-center p-2">
                <Image
                  src={qrCodeImage}
                  alt="Código QR del proyecto"
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <p className="text-xs text-[#26374c] mt-2 text-center">
                Escanea para ver el proyecto
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section for "Personalizados y únicos" and "Imprímelos y muéstralos" */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start mb-24 md:mb-36">
        {/* Left Text Block */}
        <motion.div
          className="text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={featureVariants}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#26374c] mb-4 leading-tight">
            Personalizados y únicos
          </h1>
          <p className="text-lg md:text-xl text-[#26374c] max-w-md mx-auto md:mx-0">
            Cada certificado está firmado por el profesor que ha impartido el
            curso. Y también lleva tu nombre, así que es único e irrepetible.
          </p>
        </motion.div>
        {/* Right Text Block */}
        <motion.div
          className="text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={featureVariants}
          transition={{ delay: 0.2 }} // Slightly delay the second feature
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#26374c] mb-4 leading-tight">
            Imprímelos y muéstralos
          </h1>
          <p className="text-lg md:text-xl text-[#26374c] max-w-md mx-auto md:mx-0">
            Imprime tus certificados para colgarlos en la pared. Será un bello
            recordatorio físico de todo lo que has aprendido.
          </p>
        </motion.div>
      </div>

      {/* New Call to Action Section: "Más cursos..." and Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={ctaVariants}
        >
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#26374c] mb-8 leading-tight drop-shadow-sm">
            Más cursos para desarrollar tus habilidades
          </h2>

          <Link href="/cursosall" className="block mb-6">
          <motion.button
            className="bg-[#006394] hover:bg-[#26374c] text-white font-bold py-3 px-8 rounded-xl text-lg md:text-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            variants={ctaVariants} // Use ctaVariants for the button's hover state as well
            whileHover="hover"
            >
            Ver todos los cursos
          </motion.button>
            </Link>
        </motion.div>
      </div>

      {/* Basic Tailwind CSS for custom scrollbar hiding (optional, for visual cleanliness) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default Celular;