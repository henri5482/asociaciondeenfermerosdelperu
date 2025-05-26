'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const Beneficios = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewContainer = useInView(containerRef, { once: true, amount: 0.1 });

  const benefits = [
    {
      id: 1,
      icon: '/logo-1.svg', // Keeping the original path
      title: 'Obtén un gran descuento si eres estudiante',
      description: 'Prepárate un año en EDteam a mitad de precio y consigue tu primer empleo antes de acabar tu carrera.',
    },
    {
      id: 2,
      icon: '/logo-2.svg', // Keeping the original path
      title: 'Trae amigos y estudia gratis',
      description: 'Ayuda a tus contactos a obtener un descuento en EDteam y gana suscripciones premium.',
    },
    {
      id: 3,
      icon: '/logo-3.svg', // Keeping the original path
      title: 'Regala educación a tus seres queridos',
      description: 'Obsequia un curso o una suscripción y ayuda a las personas que más quieres a avanzar en su carrera.',
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const benefitCardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    }),
  };

  const mediaVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
    },
  };

  const communityTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <section className="bg-[#26374c] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0" style={{
        background: `
          radial-gradient(circle at 15% 25%, rgba(0,194,168,0.08) 0%, transparent 40%),
          radial-gradient(circle at 85% 75%, rgba(0,194,168,0.08) 0%, transparent 40%),
          linear-gradient(to bottom, transparent, #0b101b 90%)
        `
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E1F5FE] text-center mb-12 md:mb-16 leading-tight"
          initial="hidden"
          animate={isInViewContainer ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Aprovecha los beneficios y crece con <span className="text-[#E1F5FE]">Nosotros</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Benefit Cards */}
          <div className="flex flex-col space-y-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="flex items-start text-left bg-[#1a1f2c] p-6 rounded-lg shadow-xl border border-transparent hover:border-[#00c2a8]/50 transition-all duration-300"
                custom={index}
                initial="hidden"
                animate={isInViewContainer ? "visible" : "hidden"}
                variants={benefitCardVariants}
              >
                {/* Icon Container with subtle styling */}
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00c2a8]/15">
                    <Image
                      src={benefit.icon}
                      alt={`${benefit.title} icon`}
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                {/* Text Content for the Benefit */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Main Image/Video and Community Text */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="w-full relative rounded-lg overflow-hidden shadow-2xl bg-gray-800" // Added bg-gray-800 for fallback color
              initial="hidden"
              animate={isInViewContainer ? "visible" : "hidden"}
              variants={mediaVariants}
              // Adjust paddingBottom to prevent cropping.
              // Based on image_54976e.jpg, a ratio closer to 16:9 or slightly taller might fit.
              // Let's try 65% for a slightly less wide aspect ratio to fit the content.
              // If it's still cropped, you might need to adjust this value.
              style={{ paddingBottom: '65%' }} // Adjusted aspect ratio to prevent cropping
            >
              <Image
                src="/Group65.png" // Keeping the original path
                alt="Course cover: Bioseguridad y Prevención de Riesgos Hospitalario"
                layout="fill"
                objectFit="contain" // Changed to 'contain' to ensure the whole image is visible, even if it adds letterboxing
                className="rounded-lg"
              />
              {/* Overlay for subtle dimming/effect */}
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </motion.div>

            {/* Community Text below the image */}
            <motion.p
              className="mt-8 text-base sm:text-lg text-gray-300 font-medium text-center max-w-md mx-auto"
              initial="hidden"
              animate={isInViewContainer ? "visible" : "hidden"}
              variants={communityTextVariants}
            >
              Más que una empresa, somos una comunidad que se preocupa por ti
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beneficios;