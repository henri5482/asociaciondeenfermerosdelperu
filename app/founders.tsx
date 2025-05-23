'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowArcLeft, PiArrowArcRight } from "react-icons/pi";
import { FaLinkedinIn, FaTwitter, FaGlobe } from "react-icons/fa"; // Importar iconos de Font Awesome
import Link from "next/link";

// Interfaces
interface Social {
  linkedin?: string;
  twitter?: string;
  website?: string;
}

interface Founder {
  name: string;
  role: string;
  image: string;
  courseLogo?: string;
  courseTitle: string;
  description: string;
  social?: Social;
  courseLink?: string; // NUEVO: Añadimos la propiedad courseLink
}

// Datos de ejemplo
const founders: Founder[] = [
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    courseTitle: "Curso de Python: De Cero a Experto",
    courseLogo: "/logo-5.svg",
    description: "Instructora especializada en Python con más de 5 años de experiencia en desarrollo de software y docencia. Su enfoque práctico te llevará desde los fundamentos hasta proyectos complejos.",
    social: {
      linkedin: "https://linkedin.com/in/carliflorida",
      twitter: "https://x.com/carliflorida",
    },
    courseLink: "http://localhost:3000/cursos/programacion-ia", // Enlace real al curso de Python
  },
  {
    name: "Juan Pérez",
    role: "Lead Data Scientist en TechCorp",
    image: "/image-1.jpg",
    courseTitle: "Machine Learning Avanzado con R",
    courseLogo: "/logo-6.svg",
    description: "Científico de datos senior con vasta experiencia en algoritmos de aprendizaje automático y análisis predictivo. Te guiará a través de proyectos reales y desafíos del sector.",
    social: {
      linkedin: "https://linkedin.com/in/juanperez",
      website: "https://juanperez.com",
    },
    courseLink: "https://example.com/ml-r", // Enlace de ejemplo
  },
  {
    name: "Maria García",
    role: "Product Manager en StartupX",
    image: "/image-3.jpg",
    courseTitle: "Gestión de Productos Digitales",
    courseLogo: "/logo-7.svg",
    description: "Experta en desarrollo de productos digitales, con un historial comprobado de lanzamiento de productos exitosos. Aprenderás metodologías ágiles y estrategias de mercado.",
    social: {
      twitter: "https://x.com/mariagarcia",
      website: "https://mariagarcia.dev",
    },
    courseLink: "https://example.com/product-management", // Enlace de ejemplo
  },
  {
    name: "Luis Fernández",
    role: "Desarrollador Frontend Senior",
    image: "/image-4.jpg",
    courseTitle: "Mastering React & Next.js",
    courseLogo: "/logo-8.svg",
    description: "Desarrollador con profundo conocimiento en ecosistemas JavaScript, especializado en React y Next.js. Descubre las mejores prácticas y construye aplicaciones escalables.",
    social: {
      linkedin: "https://linkedin.com/in/luisfernandez",
    },
    courseLink: "https://example.com/react-nextjs", // Enlace de ejemplo
  },
  {
    name: "Ana López",
    role: "Experta en UX/UI",
    image: "/image-5.jpg",
    courseTitle: "Diseño de Experiencia de Usuario",
    courseLogo: "/logo-9.svg",
    description: "Diseñadora con pasión por crear interfaces intuitivas y experiencias de usuario memorables. Explorarás los principios de usabilidad y accesibilidad.",
    social: {
      linkedin: "https://linkedin.com/in/analopez",
      twitter: "https://x.com/analopez",
      website: "https://analopez.design",
    },
    courseLink: "https://example.com/ux-ui-design", // Enlace de ejemplo
  },
];

const Founders = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Responsive setup
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let mobile = false;
      let items = 4;

      if (width < 640) {
        mobile = true;
        items = 1;
      } else if (width >= 640 && width < 768) {
        mobile = true;
        items = 2;
      } else if (width >= 768 && width < 1024) {
        items = 3;
      } else if (width >= 1024 && width < 1280) {
        items = 4;
      } else {
        items = 4;
      }
      
      setIsMobile(mobile);
      setItemsToShow(items);
      setStartIndex(prev => Math.min(prev, Math.max(0, founders.length - items)));
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, [founders.length]);

  const next = () => {
    setStartIndex(prev => (prev + 1) % (founders.length - itemsToShow + 1));
  };

  const prev = () => {
    setStartIndex(prev => (prev - 1 + (founders.length - itemsToShow + 1)) % (founders.length - itemsToShow + 1));
  };

  const handleDragEnd = (_e: never, info: { offset: { x: number } }) => {
    const threshold = 100;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  const visibleFounders = founders.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className="bg-[#E1F5FE] py-16 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl xl:max-w-screen-xl"> 
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-16">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
            >
              Conoce a nuestros <span className="text-blue-600">profesores expertos</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-gray-700"
            >
              Aprende directamente de líderes y profesionales con experiencia real en la industria.
            </motion.p>
          </div>
          
          {/* Desktop arrows */}
          <div className="hidden md:flex gap-4">
            <motion.button 
              onClick={prev}
              whileHover={{ scale: 1.1, backgroundColor: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Anterior"
            >
              <PiArrowArcLeft className="text-blue-600 text-3xl" />
            </motion.button>
            <motion.button 
              onClick={next}
              whileHover={{ scale: 1.1, backgroundColor: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Siguiente"
            >
              <PiArrowArcRight className="text-blue-600 text-3xl" />
            </motion.button>
          </div>
        </div>

        {/* Cards container */}
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              className={`grid gap-6 lg:gap-8 ${ 
                itemsToShow === 1 ? 'grid-cols-1' :
                itemsToShow === 2 ? 'grid-cols-2' :
                itemsToShow === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}
              key={startIndex}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: startIndex > 0 ? -50 : 50 },
                show: { opacity: 1, x: 0, transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" } },
                exit: { opacity: 0, x: startIndex > 0 ? 50 : -50, transition: { staggerChildren: 0.08, duration: 0.4, ease: "easeIn" } },
              }}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={isMobile ? 0.2 : false} 
            >
              {visibleFounders.map((founder, index) => (
                <motion.div
                  key={`${founder.name}-${index}-${startIndex}`}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 18, stiffness: 120 } },
                    exit: { opacity: 0, y: -30, transition: { duration: 0.25 } },
                  }}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image with zoom effect */}
                  <div className="relative w-full overflow-hidden">
                    <motion.div
                      animate={{ scale: hoveredCard === index ? 1.08 : 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full"
                      style={{ paddingBottom: '125%' }} // Aspect ratio 4:5 para imagen vertical (retrato)
                    >
                      <Image
                        fill
                        src={founder.image}
                        alt={`Foto de ${founder.name}`}
                        className="object-cover absolute inset-0"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                        priority={index < 2}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-7 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg sm:text-xl mb-1 text-gray-900 leading-tight line-clamp-1">{founder.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-1">{founder.role}</p>
                    
                    <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                       {founder.description}
                    </p>
                    
                    {/* Course area - AHORA CON LINK CONDICIONAL */}
                    {founder.courseLink && ( // Solo si existe courseLink, se renderiza el Link
                      <Link
                        href={founder.courseLink} // Usamos la nueva propiedad
                        target="_blank" // Abre en una nueva pestaña
                        rel="noopener noreferrer" // Mejora la seguridad
                        className="block pt-4 border-t border-gray-200 group mt-auto"
                      >
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex items-center gap-3"
                        >
                          {founder.courseLogo && (
                            <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0">
                              <Image
                                src={founder.courseLogo}
                                alt="Logo del curso"
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span className="text-sm sm:text-base font-semibold text-blue-700 group-hover:text-blue-900 transition-colors line-clamp-1">
                            {founder.courseTitle}
                          </span>
                        </motion.div>
                      </Link>
                    )}

                    {/* Social Icons */}
                    {(founder.social?.linkedin || founder.social?.twitter || founder.social?.website) && (
                      <div className="flex gap-4 mt-5 pt-4 border-t border-gray-100">
                          {founder.social.linkedin && (
                              <motion.a 
                                  href={founder.social.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  whileHover={{ scale: 1.2, color: "#0A66C2" }} 
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="LinkedIn"
                                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                              >
                                  <FaLinkedinIn className="h-6 w-6" />
                              </motion.a>
                          )}
                          {founder.social.twitter && (
                              <motion.a 
                                  href={founder.social.twitter} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  whileHover={{ scale: 1.2, color: "#1DA1F2" }} 
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="Twitter"
                                  className="text-gray-500 hover:text-blue-400 transition-colors duration-200"
                              >
                                  <FaTwitter className="h-6 w-6" />
                              </motion.a>
                          )}
                          {founder.social.website && (
                              <motion.a
                                  href={founder.social.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.2, color: "#4F46E5" }}
                                  whileTap={{ scale: 0.9 }}
                                  aria-label="Website"
                                  className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                              >
                                  <FaGlobe className="h-6 w-6" />
                              </motion.a>
                          )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile arrows */}
        <div className="flex justify-center gap-6 mt-12 md:hidden">
          <motion.button 
            onClick={prev}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            aria-label="Anterior"
          >
            <PiArrowArcLeft className="text-blue-600 text-2xl" />
          </motion.button>
          <motion.button 
            onClick={next}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
            aria-label="Siguiente"
          >
            <PiArrowArcRight className="text-blue-600 text-2xl" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Founders;