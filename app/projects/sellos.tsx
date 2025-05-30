"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

// IMPORTANT: Make sure these paths are correct and the images are in your /public directory.
// For example: public/sello01.png, public/sello02.png, etc.
const sealImages = [
  "/sello01.png",
  "/sello02.png",
  "/sello03.png",
  "/sello04.png", // Add more seal image paths here if you have them
  "/sello05.png",
];

const Sellos = () => {
  const [currentSealIndex, setCurrentSealIndex] = useState(0);

  useEffect(() => {
    // This timer manages the automatic changing of the seal image.
    const sealTimer = setInterval(() => {
      // It updates the currentSealIndex to the next image in the array.
      // The modulo operator (%) ensures it loops back to the first image after the last one.
      setCurrentSealIndex((prevIndex) => (prevIndex + 1) % sealImages.length);
    }, 3500); // Change seal image every 5 seconds (5000 milliseconds)

    // Cleanup function: This runs when the component unmounts or before the effect re-runs.
    // It's crucial to clear the interval to prevent memory leaks.
    return () => {
      clearInterval(sealTimer);
    };
  }, []); // The empty dependency array ensures this effect runs only once after the initial render.

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mx-auto p-4 py-20 md:p-8 max-w-6xl min-h-[88vh]">
      {/* Left Section: Text Content for Certificates */}
      <div className="flex flex-col justify-center items-center text-center md:text-left md:items-start md:w-1/2 p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#26374c] leading-tight">
          ¡Obtén tu <span className="text-[#006394]">Certificado</span>{" "}
          Personalizado!
        </h1>
        <p className="text-lg md:text-xl text-[#26374c] mb-6 max-w-md">
          Si eres <strong className="font-semibold text-[#006394]">Plus</strong>,
          al completar cualquier curso que hayas comprado, recibirás un
          certificado único firmado por el profesor. ¡Comparte tus logros!
        </p>
        <Link href="/cursosall" className="inline-block">
        
        <button className="bg-[#006394] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          Explorar Cursos
        </button>
        </Link>
      </div>

      {/* Right Section: Dynamic Animated Seals Display */}
      <div className="relative w-full md:w-1/2 mt-12 md:mt-0 flex justify-center items-center">
        {/* This div acts as a container for the seals, ensuring they stack correctly */}
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
          {/* Map through the sealImages array to render each seal */}
          {sealImages.map((src, index) => (
            <Image
              key={index} // Unique key for each mapped item
              src={src}
              alt={`Certification Seal ${index + 1}`}
              width={400} // Set intrinsic width for Next/Image optimization
              height={400} // Set intrinsic height for Next/Image optimization
              // Apply dynamic classes for animation:
              // - absolute: Positions images on top of each other
              // - transition-opacity duration-1000 ease-in-out: Smooth fade animation over 1 second
              // - opacity-100 scale-100: For the currently active seal (fully visible, normal size)
              // - opacity-0 scale-90: For inactive seals (hidden, slightly smaller)
              className={`absolute transition-opacity duration-1000 ease-in-out ${
                index === currentSealIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
              style={{ objectFit: "contain" }} // Ensures PNG transparency is handled correctly and image fits without cropping
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Sellos;
