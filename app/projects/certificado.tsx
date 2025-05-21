"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const images = [
  '/image-6.jpg',
  '/image-7.jpg', // Add more images as needed for the main display
  '/image-8.jpg',
];

const sealImages = [
  '/seal-1.png', // Replace with your actual seal image paths
  '/seal-2.png',
  '/seal-3.png',
  '/seal-4.png',
  '/seal-5.png',
];

const Certificado = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSealIndex, setCurrentSealIndex] = useState(0);

  useEffect(() => {
    // Timer for main image change
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change main image every 4 seconds

    // Timer for seal image change
    const sealTimer = setInterval(() => {
      setCurrentSealIndex((prevIndex) => (prevIndex + 1) % sealImages.length);
    }, 5000); // Change seal image every 5 seconds

    return () => {
      clearInterval(imageTimer);
      clearInterval(sealTimer);
    };
  }, []);

  return (
    <div className='flex flex-col md:flex-row justify-center items-center mx-auto p-4 md:p-8 max-w-6xl'>
      {/* Left Section: Text Content */}
      <div className='flex flex-col justify-center items-center text-center md:text-left md:items-start md:w-1/2 p-4'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-800'>
          Certificados de los cursos
        </h1>
        <p className='text-base md:text-lg text-gray-600 mb-6'>
          Si eres Plus, cuando completes un curso que hayas comprado obtendrás un certificado personalizado firmado por el profesor para que lo puedas compartir.
        </p>
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out'>
          Ver cursos
        </button>
      </div>

      {/* Right Section: Image Slider with Seals */}
      <div className='relative w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center'>
        <Image
          src={images[currentImageIndex]}
          alt="Course Certificate"
          width={700} // Increased width for better display
          height={700} // Increased height for better display
          className='rounded-lg shadow-xl object-cover'
        />
        {/* Overlay for Seals */}
        <div className='absolute bottom-4 right-4'>
          <Image
            src={sealImages[currentSealIndex]}
            alt="Certification Seal"
            width={100} // Adjust size as needed
            height={100} // Adjust size as needed
            className='rounded-full shadow-lg'
          />
        </div>
      </div>
    </div>
  );
};

export default Certificado;