"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

// Definición de las empresas con sus logos
const companies = [
  { name: "coca-cola", logo: "/logo-1.svg" },
  { name: "amazon", logo: "/logo-2.svg" },
  { name: "forbes", logo: "/logo-3.svg" },
  { name: "booking", logo: "/logo-4.svg" },
  { name: "microsoft", logo: "/logo-5.svg" },
  { name: "paypal", logo: "/logo-6.svg" },
  { name: "redbull", logo: "/logo-1.svg" },
  { name: "salesforce", logo: "/logo-2.svg" },
  { name: "spotify", logo: "/logo-3.svg" },
  { name: "lift", logo: "/logo-4.svg" },
];

const firstRow = companies.slice(0, Math.ceil(companies.length / 2));
const secondRow = companies.slice(Math.ceil(companies.length / 2));

// Componente para el logo de la empresa (tamaño reducido)
const CompanyLogo = ({ name, logo }: { name: string; logo: string }) => {
  return (
    <motion.div
      className="mx-4 flex items-center justify-center" // mx-4 para menos espacio horizontal
      whileHover={{
        scale: 1.05, // Zoom más sutil al ser más pequeño
        rotate: 1, // Menos rotación
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Image
        priority
        width={100} // Reducimos el width original
        height={100} // Reducimos el height original
        src={logo}
        alt={`${name} logo`}
        // Aplicamos los efectos de grayscale y opacidad directamente a la imagen
        className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0" // Reducimos los tamaños de las clases w/h
      />
    </motion.div>
  );
};

const Trusted = () => {
  // Animación para el título y el párrafo (se mantienen las duraciones, se ajustan tamaños)
  const textVariants = {
    hidden: { opacity: 0, y: 20 }, // Menos desplazamiento vertical
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.15 } }, // StaggerChildren un poco más rápido
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Menos desplazamiento vertical
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, // Duración más rápida
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden py-12 md:py-16 relative", // Menos padding vertical
        "bg-[#E1F5FE] text-[#006394]" // Fondo claro y texto oscuro
      )}
    >
      {/* Elementos de fondo decorativos (ajustados para ser más sutiles en un espacio más pequeño) */}
      <div className="absolute inset-0 z-0 opacity-0 md:opacity-10"> {/* Menos opacidad o ocultos en móviles */}
        {/* Patrón de puntos geométricos */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(15, 30, 38, 0.03) 1px, transparent 1px)`, // Puntos aún más sutiles
            backgroundSize: `30px 30px`, // Menos densos
          }}
        ></div>
        {/* Efecto de luz sutil en el fondo (tamaño reducido) */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse-slow"></div> {/* Tamaño y blur reducidos */}
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56  rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse-slow delay-500"></div> {/* Tamaño y blur reducidos */}
      </div>

      {/* Sección de contenido superior (margen inferior reducido) */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mb-10"> {/* max-w y px reducidos, mb reducido */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Viewport trigger más temprano
          variants={textVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight tracking-tight" // Título más pequeño
            variants={itemVariants}
          >
            Nuestros{' '}
            <span
              className="text-[#006394] bg-clip-text bg-gradient-to-r" // Degradado de azules vibrantes
            >
              Socios Estratégicos
            </span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-[#0f1e26] leading-relaxed max-w-2xl mx-auto" // Párrafo más pequeño
            variants={itemVariants}
          >
            Colaboramos con líderes del sector para ofrecerte la educación más vanguardista y relevante para tu crecimiento profesional.
          </motion.p>
        </motion.div>
      </div>

      {/* Contenedor de las marquesinas (margen superior reducido) */}
      <div className="relative z-10 flex w-full flex-col items-center mt-8"> {/* mt reducido */}
        {/* Primera fila de logos */}
        <Marquee pauseOnHover className="[--duration:30s] gap-12"> {/* Duración más rápida, gap un poco reducido */}
          {firstRow.map((company, idx) => (
            <CompanyLogo key={`${company.name}-${idx}`} {...company} />
          ))}
        </Marquee>
        {/* Segunda fila de logos (en dirección opuesta) */}
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:30s] mt-8 md:mt-10 gap-12" // mt reducido
        >
          {secondRow.map((company, idx) => (
            <CompanyLogo key={`${company.name}-${idx}`} {...company} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Trusted;