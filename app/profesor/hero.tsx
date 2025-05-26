"use client"; // Necesario para Framer Motion y hooks de React

import { Button } from "@/components/ui/button"; // Ajusta la ruta si es diferente
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre la animación de cada hijo
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonHoverTap = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative w-full pt-20 min-h-[450px] sm:min-h-[500px] md:min-h-[580px] lg:min-h-[650px] xl:min-h-[750px] flex items-center overflow-hidden">
      {/* Imagen de fondo */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.8 }} // Sutil efecto de zoom y fade al inicio
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} // Ease-out-expo like
      >
        <Image
          src="/profesor.jpg"
          alt="Fondo de EDteam: Enseña desde casa"
          fill // Reemplaza layout="fill"
          objectFit="cover"
          quality={90}
          priority
          className="z-0" // className en Image se aplica al wrapper, no al img directamente con fill
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2D66C2] opacity-20 z-10"></div>

      {/* Contenedor del texto y botones con animaciones */}
      <motion.div
        className="
          relative z-20 
          w-full 
          px-4 sm:px-6 md:px-8 lg:px-0 xl:px-0 
          py-8 sm:py-10 md:py-12
          max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[700px]
          mx-auto lg:mx-0 
          text-center lg:text-left
          lg:ml-[calc(8rem)] xl:ml-[calc(10rem)] 
        "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-[#E1F5FE] text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-6xl font-extrabold leading-tight mb-4 md:mb-6"
          variants={itemVariants}
        >
          Enseña con Nosotros desde tu casa
          <br className="hidden md:block" />
          y deja tu huella en el mundo
        </motion.h1>

        {/* Sección de etiquetas de experiencia - Estilo mejorado */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 md:mb-8"
          variants={itemVariants}
        >
          <span className="bg-white/25 text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium shadow-sm">
            Tengo experiencia enseñando
          </span>
          <span className="bg-white/25 text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-full font-medium shadow-sm">
            Nunca he enseñado
          </span>
        </motion.div>

        {/* Botones con shadcn/ui y Framer Motion */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4"
          variants={itemVariants}
        >
          <motion.div {...buttonHoverTap}>
            <Button
              size="lg" // shadcn/ui button size
              className="w-full sm:w-auto bg-[#26374c] text-[#E1F5FE] font-bold hover:bg-white transition-colors duration-300 shadow-md text-sm sm:text-base py-2.5 px-5"
              // El padding y font-size se pueden controlar también con props de Button o mantener en className
            >
              Comienza a enseñar
            </Button>
          </motion.div>

          <motion.div {...buttonHoverTap}>
            <Button
              variant="outline" // shadcn/ui outline variant
              size="lg"
              className="w-full sm:w-auto  bg-[#26374c]  text-white font-bold hover:bg-white hover:text-[#2D66C2] transition-colors duration-300 text-sm sm:text-base py-2.5 px-5"
            >
              Postúlate a la escuela de profesores
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;