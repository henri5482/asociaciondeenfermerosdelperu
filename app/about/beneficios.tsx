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
      icon: '/logo-1.svg',
      title: 'Obtén un gran descuento si eres estudiante',
      description: 'Prepárate un año en EDteam a mitad de precio y consigue tu primer empleo antes de acabar tu carrera.',
    },
    {
      id: 2,
      icon: '/logo-2.svg',
      title: 'Trae amigos y estudia gratis',
      description: 'Ayuda a tus contactos a obtener un descuento en EDteam y gana suscripciones premium.',
    },
    {
      id: 3,
      icon: '/logo-3.svg',
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
      {/* Background element - consider if it's truly needed or adds too much complexity */}
      <div className="absolute inset-0 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E1F5FE] text-center mb-12 md:mb-16 leading-tight"
          initial="hidden"
          animate={isInViewContainer ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Aprovecha los beneficios y crece con <span className="text-[#00c2a8]">Nosotros</span> {/* Changed highlight color for consistency */}
        </motion.h2>

        {/* Grid layout changes from 1 column to 2 columns on large screens */}
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
                      // Use `sizes` prop for better image optimization across different viewports
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <div className="flex flex-col items-center justify-center mt-12 lg:mt-0"> {/* Added margin top for small screens */}
            <motion.div
              className="w-full relative rounded-lg overflow-hidden shadow-2xl bg-gray-800 max-w-md lg:max-w-none" // Constrain max-width on smaller screens
              initial="hidden"
              animate={isInViewContainer ? "visible" : "hidden"}
              variants={mediaVariants}
              style={{ paddingBottom: '65%' }} // A 16:9 aspect ratio (56.25%) is common; 65% is slightly taller. Adjust as needed for your image.
            >
              <Image
                src="/Group65.png"
                alt="Course cover: Bioseguridad y Prevención de Riesgos Hospitalario"
                layout="fill"
                objectFit="contain" // `contain` is good for ensuring the whole image is visible
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" // Added sizes for better image optimization
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