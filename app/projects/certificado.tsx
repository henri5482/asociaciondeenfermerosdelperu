"use client"; // This directive is necessary for client-side components in Next.js 13+ App Router

import Image from 'next/image';
import { useEffect, useState } from 'react';

// IMPORTANT: Place your certificate images in the /public directory.
// For example: public/certificate-1.jpg, public/certificate-2.jpg, etc.
// These should ideally be images of your actual certificates or mockups.
const certificateImages = [
  '/certificado01.png', 
  '/certificado02.png', 
  '/certificado03.png',
  '/certificado04.png', 
  // '/certificate-4.jpg',
];

const Certificado = () => {
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  useEffect(() => {
    // Set up an interval to change the displayed certificate image
    const certTimer = setInterval(() => {
      setCurrentCertIndex((prevIndex) => (prevIndex + 1) % certificateImages.length);
    }, 4000); // Change certificate every 4 seconds (4000 milliseconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(certTimer);
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <section className='bg-[#E1F5FE] py-20 '> {/* Added a section tag for better semantic structure and padding */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Title */}
        <h2 className='text-4xl md:text-5xl font-extrabold text-[#26374c] mb-8 leading-tight'>
          Compártelos con el mundo
        </h2>
        {/* Description */}
        <p className='text-lg md:text-xl text-[#26374c] mb-12 max-w-2xl mx-auto'>
          Tus certificados tienen un enlace único para que puedas compartir una versión online donde y con quien quieras.
        </p>

        {/* Certificate Display Area (Tablet-like Frame) */}
        <div className='relative w-full max-w-3xl mx-auto p-4'>
          {/* Mockup Tablet Frame (using Tailwind for basic shape) */}
          <div className='relative w-full pt-[73%] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-950'>
            {/* Top Bar for the mock-up device */}
            <div className='absolute top-0 left-0 right-0 h-8 bg-gray-800 rounded-t-xl flex items-center justify-center'>
              <div className='w-2 h-2 bg-gray-700 rounded-full mx-1'></div>
              <div className='w-1 h-1 bg-gray-700 rounded-full mx-1'></div>
            </div>
            {/* Screen content area */}
            <div className='absolute top-8 bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-gray-900'>
              {/* Dynamic Certificate Image */}
              {certificateImages.map((src, index) => (
                <Image
                  key={index} // Unique key for each mapped item
                  src={src}
                  alt={`Certificado Domestika ${index + 1}`}
                  // The actual width and height of the image, adjusted to fit the frame
                  width={900}
                  height={600}
                  // Styling for the image within the frame
                  className={`absolute w-[95%] h-[95%] object-contain rounded-lg border border-gray-300 transition-opacity duration-1000 ease-in-out ${
                    index === currentCertIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  priority={index === 0} // Prioritize loading the first image
                />
              ))}
            </div>
             {/* Bottom Button (Home button mimic) */}
             <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center'>
                {/* Optional: Add a small icon or dot here if desired */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificado;