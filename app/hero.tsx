"use client";

import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
// Asegúrate de que esta ruta sea correcta según tu configuración de Shadcn/UI
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  // Lógica para asegurar que la animación se ejecute solo una vez en la carga inicial.
  // Esto evita re-animaciones en navegaciones suaves (client-side route changes) si no se desea.
  useEffect(() => {
    // Si la animación no se ha ejecutado aún, la marcamos para que se ejecute.
    // Esto se activa solo en la primera carga del componente en el cliente.
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]); // Dependencia en hasAnimated para evitar re-renderizados innecesarios

  // Scroll animations for the image
  // Escala la imagen ligeramente y ajusta el border-radius para un efecto de 'expansión' al hacer scroll.
  const imageScale = useTransform(scrollY, [0, 600], [0.95, 1], { ease: easeOut });
  const imageBorderRadius = useTransform(scrollY, [0, 600], [28, 0], { ease: easeOut });

  // Variants for staggered content animation (text and paragraphs)
  const contentParentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for a snappier feel
        staggerChildren: 0.15, // Increased stagger for more noticeable effect
        delayChildren: 0.3, // Delay start of children animations
      },
    },
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variants for the main call to action button
  const buttonVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 1.2, // Asegura que el botón aparezca después del texto principal
      },
    },
  };

  // Variants for the image container
  const imageContainerVariants = {
    hidden: { opacity: 0, x: 70, scale: 0.9 }, // Slight horizontal shift for entrance
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: 0.8, // Retraso para que la imagen aparezca después de que el texto comience
        duration: 1.2, // Longer duration for a grander entrance
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Variants for the subtle "shine" effect on the image on load
  const imageShineVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
      opacity: 0.5, // Menor opacidad para un brillo más sutil
      x: "100%",
      transition: {
        delay: 1.8, // Aparece un poco después de que la imagen se establezca
        duration: 1.0,
        ease: "easeInOut",
        repeat: 0, // Asegura que el brillo solo ocurra una vez
      },
    },
  };

  return (
    
    <div className="relative overflow-hidden bg-[#0f1e26] text-white pt-32 md:pt-40 pb-20 md:pb-24 px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24 min-h-screen">
      
      <motion.div
        className="relative z-10 w-full md:w-1/2 text-center md:text-left"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={contentParentVariants}
      >
        {/* Título principal */}
        {/*
          - `text-3xl md:text-5xl lg:text-6xl`: Tamaños de fuente responsivos.
          - `leading-tight`: Espaciado entre líneas.
          - `tracking-tight`: Ajuste del espaciado de letras.
        */}
        <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 tracking-tight" variants={contentItemVariants}>
          <span className="block">Prepárate para un futuro</span>
          <span className="block text-[#00ffc3]">dominado por la tecnología</span>
        </motion.h1>

        {/* Párrafos descriptivos */}
        {/*
          - `text-base md:text-lg`: Tamaños de fuente responsivos.
          - `max-w-lg mx-auto md:mx-0`: Ancho máximo para el texto, centrado en móviles, alineado a la izquierda en MD+.
        */}
        <motion.p className="text-base md:text-lg text-gray-200 mb-4 max-w-lg mx-auto md:mx-0" variants={contentItemVariants}>
          Aprende IA, programación y habilidades clave para tu futuro profesional en EDteam.
        </motion.p>

        <motion.p className="text-sm md:text-base text-gray-300 mb-6 max-w-lg mx-auto md:mx-0" variants={contentItemVariants}>
          9 años siendo la plataforma más obsesionada con la calidad de sus cursos.
        </motion.p>

        {/* Contenedor de Botones y Texto Pequeño */}
        {/*
          - `flex flex-col sm:flex-row`: Botones en columna en móviles pequeños, en fila en SM+.
          - `items-center sm:items-start`: Alineación vertical de ítems.
          - `justify-center md:justify-start`: Centra los botones en móviles, los alinea a la izquierda en MD+.
        */}
        <motion.div
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8 md:mt-10 justify-center md:justify-start"
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          variants={buttonVariants}
        >
          <Button
            asChild // Renderiza como el elemento hijo, en este caso, un 'a'
            className="
              relative overflow-hidden
              inline-flex items-center justify-center
              bg-gradient-to-r from-[#00a83e] to-[#00c54a] hover:from-[#008a33] hover:to-[#00a83e]
              text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg
              transition-all duration-300 ease-in-out transform
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00c54a]
              min-w-[200px] text-center
              w-full sm:w-auto // Ocupa todo el ancho en móviles, auto en SM+
            "
          >
            <motion.a
              href="/start-free" // Use a more descriptive link
              whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0, 168, 62, 0.4)" }} // Sombra más prominente al hacer hover
              whileTap={{ scale: 0.95 }}
            >
              Comienza a estudiar gratis
            </motion.a>
          </Button>
          <motion.p className="text-xs md:text-sm text-gray-300 pt-2" variants={contentItemVariants}>
            Sin tarjeta de crédito
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Contenedor de la Imagen Derecha */}
      {/*
        - `relative z-10`: Asegura que la imagen esté por encima de cualquier fondo absoluto.
        - `w-full md:w-1/2`: Ocupa todo el ancho en móviles, la mitad en MD+.
        - `flex justify-center items-center`: Centra la imagen dentro de su contenedor.
      */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center items-center"
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={imageContainerVariants}
      >
        <motion.div
          style={{
            scale: imageScale,
            borderRadius: imageBorderRadius,
            overflow: "hidden", // Asegura que el borderRadius se aplique correctamente a la imagen
          }}
          // `relative w-full aspect-video`: La imagen siempre tendrá una relación de aspecto 16:9, ocupando todo el ancho disponible.
          // `shadow-2xl border-2 border-transparent bg-gray-800`: Estilos visuales para el contenedor de la imagen.
          className="relative w-full aspect-video shadow-2xl border-2 border-transparent bg-gray-800"
        >
          <img
            src="https://edteam-media.s3.amazonaws.com/courses/big/183dbb3b-014f-44f3-b1ca-e9b348e1adbb.png"
            alt="Estudiante aprendiendo tecnología en EDteam"
            // `w-full h-full object-cover object-center`: Asegura que la imagen cubra completamente su contenedor.
            className="w-full h-full object-cover object-center"
          />
          {/* Sutil efecto de brillo al cargar la imagen */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            variants={imageShineVariants}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
          ></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;