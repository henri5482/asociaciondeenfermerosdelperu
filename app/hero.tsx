"use client";

import { easeOut, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    setHasAnimated(!(navigation?.type === "reload" || navigation?.type === "navigate"));
  }, []);

  const imageScale = useTransform(scrollY, [0, 500], [0.95, 1], { ease: easeOut });
  const imageWidth = useTransform(scrollY, [0, 500], ["90%", "100%"], { ease: easeOut });
  const imageBorderRadius = useTransform(scrollY, [0, 500], [28, 0], { ease: easeOut });

  const contentVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.7, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="bg-[#0f6ea7] text-white pt-28 md:pt-56 md:py-40 px-6 md:px-20 lg:px-36 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <motion.div
        className="w-full md:w-1/2"
        initial={hasAnimated ? "visible" : "hidden"}
        animate="visible"
        variants={contentVariants}
      >
        <motion.h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4" variants={contentVariants}>
          <span className="block">Prepárate para un futuro</span>
          <span className="block text-[#00ffc3]">dominado por la tecnología</span>
        </motion.h1>

        <motion.p className="text-base md:text-lg text-gray-200 mb-4" variants={contentVariants}>
          Aprende IA, programación y habilidades clave para tu futuro profesional en EDteam.
        </motion.p>

        <motion.p className="text-sm text-gray-300 mb-6" variants={contentVariants}>
          9 años siendo la plataforma más obsesionada con la calidad de sus cursos.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          variants={buttonVariants}
          initial={hasAnimated ? "visible" : "hidden"}
          animate="visible"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#00a83e] hover:bg-[#008a33] text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all"
          >
            Comienza a estudiar gratis
          </motion.a>
          <motion.p className="text-xs text-gray-300" variants={contentVariants}>
            Sin tarjeta de crédito
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center"
        initial={hasAnimated ? "visible" : "hidden"}
        animate="visible"
        variants={imageContainerVariants}
      >
        <motion.div
          style={{
            width: imageWidth,
            scale: imageScale,
            borderRadius: imageBorderRadius,
            overflow: "hidden",
          }}
          className="w-full shadow-xl"
        >
          <img
            src="https://edteam-media.s3.amazonaws.com/courses/big/183dbb3b-014f-44f3-b1ca-e9b348e1adbb.png"
            alt="Estudiante aprendiendo tecnología en EDteam"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
