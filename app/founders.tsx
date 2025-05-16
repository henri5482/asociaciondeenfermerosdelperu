'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiArrowArcLeft, PiArrowArcRight } from "react-icons/pi";

interface Social {
  linkedin: string;
  twitter: string;
  website?: string;
}

interface Founder {
  name: string;
  role: string;
  image: string;
  image2?: string;
  titulo: string;
  description: string;
  social: Social;
}

const founders: Founder[] = [
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    titulo: "Curso de Python",
    image2: "/logo-5.svg",
    description: "Instructora especializada en Python con 5 años de experiencia",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    titulo: "Curso de Python",
    image2: "/logo-5.svg",
    description: "Instructora especializada en Python con 5 años de experiencia",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    titulo: "Curso de Python",
    image2: "/logo-5.svg",
    description: "Instructora especializada en Python con 5 años de experiencia",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    titulo: "Curso de Python",
    image2: "/logo-5.svg",
    description: "Instructora especializada en Python con 5 años de experiencia",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-2.jpg",
    titulo: "Curso de Python",
    image2: "/logo-5.svg",
    description: "Instructora especializada en Python con 5 años de experiencia",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  // ... (otros profesores)
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
      
      if (width < 640) { // Mobile pequeño
        mobile = true;
        items = 1;
      } else if (width < 768) { // Tablet pequeña
        mobile = true;
        items = 2;
      } else if (width < 1024) { // Tablet grande
        items = 3;
      } else { // Desktop
        items = 4;
      }
      
      setIsMobile(mobile);
      setItemsToShow(items);
      setStartIndex(prev => Math.min(prev, founders.length - items));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setStartIndex(prev => (prev + 1) % (founders.length - itemsToShow + 1));
  };

  const prev = () => {
    setStartIndex(prev => (prev - 1 + founders.length - itemsToShow + 1) % (founders.length - itemsToShow + 1));
  };

  const handleDragEnd = (_e: never, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  const visibleFounders = founders.slice(startIndex, startIndex + itemsToShow);

  return (
    <div className="bg-blue-50">

    <div className="px-4 sm:px-0 mx-auto max-w-7xl py-12 md:py-24 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 px-4">
        <div className="mb-6 md:mb-0 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Nuestros profesores son expertos de la industria
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Aprende de los mejores profesionales con experiencia real
          </p>
        </div>
        
        {/* Desktop arrows */}
        <div className="hidden md:flex gap-4">
          <motion.button 
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Anterior"
          >
            <PiArrowArcLeft className="text-gray-800 text-xl" />
          </motion.button>
          <motion.button 
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Siguiente"
          >
            <PiArrowArcRight className="text-gray-800 text-xl" />
          </motion.button>
        </div>
      </div>

      {/* Cards container */}
      <div className="relative w-full overflow-x-visible px-4">
        <AnimatePresence mode="wait">
          <motion.div
            className={`grid gap-4 sm:gap-6 ${
              itemsToShow === 1 ? 'grid-cols-1' :
              itemsToShow === 2 ? 'grid-cols-2' :
              itemsToShow === 3 ? 'grid-cols-3' : 'grid-cols-4'
            }`}
            key={startIndex}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
              exit: { opacity: 0, transition: { staggerChildren: 0.05 } },
            }}
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {visibleFounders.map((founder, index) => (
              <motion.div
                key={`${founder.name}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } },
                  exit: { opacity: 0, y: -20 },
                }}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image with zoom effect */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredCard === index ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                  >
                    <Image
                      fill
                      src={founder.image}
                      alt={`Foto de ${founder.name}`}
                      className="object-cover"
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                      priority={index < 2} // Solo prioriza las primeras imágenes
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-1">{founder.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-1">{founder.role}</p>
                  
                  {/* Clickable course area */}
                  <motion.a
                    href="#"
                    className="block pt-3 border-t border-gray-100 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {founder.image2 && (
                        <div className="relative h-6 w-6 sm:h-8 sm:w-8 shrink-0">
                          <Image
                            src={founder.image2}
                            alt="Logo del curso"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {founder.titulo}
                      </span>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile arrows */}
      <div className="flex justify-center gap-4 mt-8 md:hidden px-4">
        <motion.button 
          onClick={prev}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white rounded-full shadow-md"
          aria-label="Anterior"
        >
          <PiArrowArcLeft className="text-gray-800 text-lg" />
        </motion.button>
        <motion.button 
          onClick={next}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white rounded-full shadow-md"
          aria-label="Siguiente"
        >
          <PiArrowArcRight className="text-gray-800 text-lg" />
        </motion.button>
      </div>
    </div>
    </div>
  );
};

export default Founders;