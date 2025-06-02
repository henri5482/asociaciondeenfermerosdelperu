"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image"; // Para los iconos y placeholders

// --- Placeholder Data para los beneficios ---
const benefitsData = [
  {
    id: 1,
    icon: "/billetera.png", // Reemplazar con tu ícono real (ej: Lucide icon o SVG)
    title: "Precios muy competitivos",
    description:
      "Recibirás puntualmente los pagos por todos los cursos que dictes con nosotros.",
  },
  {
    id: 2,
    icon: "/bolso.png", // Reemplazar con tu ícono real
    title: "Compramos tus equipos",
    description:
      "Cubriremos el 100% de los equipos que necesites para dictar tus cursos en EDteam.",
  },
  {
    id: 3,
    icon: "/bolso.png", // Reemplazar con tu ícono real
    title: "Te pagamos comisiones",
    description:
      "Las compras de tu curso, las vistas y tus respuestas a los estudiantes generan ingresos extra para ti.",
  },
  {
    id: 4,
    icon: "/bolso.png", // Reemplazar con tu ícono real
    title: "Te ayudamos con tu curso",
    description:
      "Nuestro equipo te acompañará en todas las etapas de tu curso para que solo te enfoques en enseñar.",
  },
];

const Beneficiosabout = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };



  return (
    <div className="bg-[#26374c] text-[#E1F5FE] py-1 px-4 sm:px-8 lg:px-16">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Anima cuando está en vista
        variants={sectionVariants}
      >
        {/* Título Principal */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 leading-tight"
          variants={itemVariants}
        >
        </motion.h2>

        {/* Grid de Beneficios */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={itemVariants} // Las tarjetas también pueden tener su animación de entrada
        >
          {benefitsData.map((benefit) => (
            <motion.div key={benefit.id} variants={itemVariants}>
              <Card className="bg-slate-800 border-slate-700 h-full flex flex-col justify-between p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-col items-center p-0 mb-4">
                  {/* Icono del Beneficio */}
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-[#E1F5FE] mb-2 leading-tight">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Beneficiosabout;