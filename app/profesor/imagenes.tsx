"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Usaremos Card para el contenedor principal
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"; // Importamos los componentes de Carousel de Shadcn UI
import { motion } from "framer-motion";
import Image from "next/image";

// --- Placeholder Data ---

const courseImages = [
  "/image-1.jpg",
  "/image-1.jpg",
  "/image-1.jpg",
  "/image-1.jpg",
  "/image-1.jpg", // Agregamos la imagen principal también al carrusel
];

const headingText = "Enseña en EDteam desde tu casa";
const paragraphText =
  "Deja tu huella en el mundo sin salir de casa y ayuda a que miles de estudiantes en Latinoamérica consigan su primer empleo, aumenten sus ingresos o creen su propio negocio.";
const tag1Text = "Tengo experiencia enseñando";
const tag2Text = "Nunca he enseñado";

const LandingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonHoverTap = {
    hover: { scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 17 } },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-[#26374c] flex items-center justify-center p-4 sm:p-8">
      <motion.div
        className="w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-slate-800 border-slate-700 shadow-xl overflow-hidden rounded-xl">
          <CardContent className="p-0 grid md:grid-cols-2 gap-0">
            {/* Panel Izquierdo: Carrusel de Imágenes */}
            <motion.div className="relative overflow-hidden" variants={itemVariants}>
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {courseImages.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-full min-h-[300px] md:min-h-[450px]">
                        <Image
                          src={src}
                          alt={`Course image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-l-xl md:rounded-l-none" // Ajustar borde para que se vea bien en el contenedor Card
                          priority={index === 0} // Priorizar la primera imagen para LCP
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#E1F5FE] bg-black/50 hover:bg-black/70" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-[#E1F5FE] bg-black/50 hover:bg-black/70" />
              </Carousel>
            </motion.div>

            {/* Panel Derecho: Contenido de Texto */}
            <motion.div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 space-y-6" variants={itemVariants}>
              <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-[#E1F5FE] leading-tight mb-2"
                variants={itemVariants}
              >
                {headingText}
              </motion.h2>
              <motion.p className="text-slate-400 text-base sm:text-lg leading-relaxed" variants={itemVariants}>
                {paragraphText}
              </motion.p>

              {/* Tags */}
              <motion.div className="flex flex-wrap gap-3 pt-2" variants={itemVariants}>
                <Badge variant="secondary" className="bg-slate-700 text-[#E1F5FE] px-3 py-1.5 text-sm font-medium hover:bg-slate-600 transition-colors">
                  {tag1Text}
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-[#E1F5FE] px-3 py-1.5 text-sm font-medium hover:bg-slate-600 transition-colors">
                  {tag2Text}
                </Badge>
              </motion.div>

              {/* Botones */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <motion.div {...buttonHoverTap} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white hover:bg-blue-700 text-black hover:text-[#E1F5FE] font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Comienza a enseñar
                  </Button>
                </motion.div>
                <motion.div {...buttonHoverTap} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-blue-500  text-black hover:bg-blue-500 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Postúlate a la escuela de profesores
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LandingSection;