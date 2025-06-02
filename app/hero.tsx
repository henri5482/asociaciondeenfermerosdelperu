"use client";

import { Button } from "@/components/ui/button"; // Asumo que esta ruta es correcta
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();

  // Animaciones de scroll para la imagen: escala y borde redondeado
  const imageScale = useTransform(scrollY, [0, 600], [0.95, 1]);
  const imageBorderRadius = useTransform(scrollY, [0, 600], [28, 0]);

  // Variants para la animación de entrada escalonada del contenido textual
  const contentParentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1], // Curva cúbica de Bezier para una animación fluida
        staggerChildren: 0.15, // Retraso entre la animación de cada elemento hijo
        delayChildren: 0.3, // Retraso inicial antes de que los hijos comiencen a animarse
      },
    },
  };

  // Variants para los elementos individuales del contenido (títulos, párrafos)
  const contentItemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variants para el botón de acción principal
  const buttonVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 1.2, // Aparece después del texto para una secuencia más natural
      },
    },
  };

  // Variants para el contenedor de la imagen
  const imageContainerVariants = {
    hidden: { opacity: 0, x: 70, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.8, // Aparece después de una parte del texto
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Variants para la animación de brillo sobre la imagen (efecto "shine")
  const imageShineVariants = {
    hidden: { opacity: 0, x: "-100%" }, // Comienza fuera de la vista a la izquierda
    visible: {
      opacity: 0.3, // Opacidad reducida para un brillo más sutil
      x: "100%", // Termina fuera de la vista a la derecha
      transition: {
        delay: 1.8, // Un poco después de que la imagen aparezca
        duration: 1.5, // Duración más larga para un movimiento más suave
        ease: "easeInOut",
        repeat: Infinity, // Repite la animación indefinidamente
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        repeatType: "loop" as "loop", // Repite el bucle desde el inicio cada vez (type assertion)
        repeatDelay: 2, // Retraso entre cada repetición del brillo
      },
    },
  };

  return (
    <main
      className="relative overflow-hidden bg-[#26374c] text-white
      pt-32  md:pt-32 lg:pt-40 xl:pt-48 2xl:pt-56
      pb-20  md:pb-16 lg:pb-20 xl:pb-24 2xl:pb-28
      px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-36
      flex flex-col-reverse md:flex-row items-center justify-between
      gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24
      min-h-screen"
    >
      {/* Contenedor de Texto Principal */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 text-center md:text-left"
        initial="hidden"
        animate="visible" // Anima a "visible" automáticamente al montar
        variants={contentParentVariants}
      >
        {/* Título principal con tamaños responsivos y énfasis de color */}
        {/* MEJORA: Se eliminaron las clases de tamaño de fuente conflictivas del motion.h1. 
            Los spans internos ahora controlan completamente sus respectivos tamaños de fuente. */}
        <motion.h1
          className="font-extrabold leading-tight mb-4 tracking-tight text-[#E1F5FE]"
          variants={contentItemVariants}
        >
          <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-[#E1F5FE]">
            Forma parte de la nueva {" "}
          </span>
          <span className="block  text-4xl md:text-5xl lg:text-6xl xl:text-[77px]  2xl:text-[80px]   drop-shadow-lg">
            Generación de Enfermeros 
          </span> 
        </motion.h1>

        {/* Párrafo descriptivo principal */}
        <motion.p
          className="text-base sm:text-lg md:text-xl  text-white mb-4 max-w-xl mx-auto md:mx-0 leading-relaxed text-justify"
          variants={contentItemVariants}
        >
          Capacítate con los mejores profesores y contenidos en{" "}
          procedimientos clínicos, primeros auxilios, bioseguridad y más.
        </motion.p>

        {/* Párrafo secundario con énfasis en años de experiencia */}
        <motion.p
          className="text-sm sm:text-base md:text-lg  text-white mb-6 max-w-xl mx-auto md:mx-0 font-light italic"
          variants={contentItemVariants}
        >
          ¡Con 9 años brindando educación de calidad al personal de salud!
        </motion.p>

        {/* Contenedor de Botones y Texto Pequeño */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-10 justify-center md:justify-start"
          initial="hidden"
          animate="visible" // Anima a "visible" automáticamente al montar
          variants={buttonVariants}
        >
          <Button
            asChild // Renderiza como un "a" tag
            className="
              relative overflow-hidden
              inline-flex items-center justify-center
              bg-gradient-to-r from-[#E1F5FE] to-[#E1F5FE] hover:from-[#008a33] hover:to-[#00a83e]
              text-[#26374c] px-8 py-5 sm:px-10 sm:py-6 2xl:py-7 rounded-full font-semibold text-base sm:text-lg md:text-xl shadow-lg
              transition-all duration-300 ease-in-out transform
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00c54a]
              w-full sm:w-auto
            "
          >
            <motion.a
              href="/start-free"
              // Efectos de hover y tap para el botón
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0, 197, 74, 0.5)", // Sombra más pronunciada en hover
              }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10" // Asegura que el texto del botón esté por encima
            >
              Comienza a estudiar gratis
            </motion.a>
          </Button>
          <motion.p
            className="text-xs sm:text-sm text-gray-400 opacity-80"
            variants={contentItemVariants}
          >
            Sin tarjeta de crédito
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Contenedor de la Imagen Derecha */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
        initial="hidden"
        animate="visible" // Anima a "visible" automáticamente al montar
        variants={imageContainerVariants}
      >
        <motion.div
          style={{
            scale: imageScale, // Aplica la escala dinámica al scroll
            borderRadius: imageBorderRadius, // Aplica el borde redondeado dinámico al scroll
            overflow: "hidden", // Esencial para que el brillo no se salga y para el borderRadius
          }}
          className="relative w-full max-w-md md:max-w-none aspect-video shadow-2xl border-2 border-transparent bg-gray-800"
        >
          <img
            src="https://edteam-media.s3.amazonaws.com/courses/big/183dbb3b-014f-44f3-b1ca-e9b348e1adbb.png"
            alt="Estudiante aprendiendo tecnología en EDteam"
            className="w-full h-full object-cover object-center"
            loading="eager" // Carga la imagen de inmediato ya que es crucial para la sección Hero
          />
          {/* Animación de brillo sobre la imagen */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            variants={imageShineVariants}
            initial="hidden"
            animate="visible" // Activa el brillo al montar
          />
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Hero;