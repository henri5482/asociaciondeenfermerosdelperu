"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// The Button import is no longer strictly necessary if the "Cerrar" button is removed and no other buttons from this import are used within this component.
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

// --- Importar los datos de los profesores ---
import docentesData from "./docentesData";

// New CourseCard Component
interface CourseCardProps {
  name: string;
  url: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ name, url, imageUrl }) => {
  return (
    <motion.div
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {/* Changed this div for aspect ratio control */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio (9/16 * 100%) */}
          <Image
            src={imageUrl}
            alt={`Imagen del curso ${name}`}
            fill
            style={{ objectFit: "cover" }} // Changed back to "cover" for a better visual fit in the new aspect ratio
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" // Added absolute and inset-0
          />
        </div>
        <div className="p-3 sm:p-4">
          <h6 className="text-white font-semibold text-base sm:text-lg mb-1 group-hover:text-blue-400 transition-colors duration-200">
            {name}
          </h6>
          <p className="text-blue-400 text-sm flex items-center justify-between">
            Ver Curso <BsArrowRight className="ml-2" />
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const Docentes = () => {
  const [selectedDocente, setSelectedDocente] = useState<
    (typeof docentesData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (docente: (typeof docentesData)[0]) => {
    setSelectedDocente(docente);
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedDocente(null);
    }, 300);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        if (!isModalOpen) {
          setSelectedDocente(null);
        }
      }, 300);
    }
  }, [isModalOpen]);

  // Animation variants for grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-[#E1F5FE] min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0d70af] mb-4 tracking-tight">
          Nuestro Prestigioso Cuerpo Docente
        </h1>
        <p className="text-lg sm:text-xl text-[#26374c] max-w-2xl mx-auto leading-relaxed">
          Conoce a los líderes y especialistas que transforman la educación en
          enfermería. Su pasión y experiencia son la base de nuestra excelencia
          académica.
        </p>
      </motion.section>
      <Separator className="text-[#26374c] max-w-3xl mx-auto my-12 opacity-70" />
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {docentesData.map((docente) => (
          <motion.div
            key={docente.id}
            className="flex flex-col items-center group cursor-pointer p-3 sm:p-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#26374c] hover:shadow-xl hover:border-blue-600 border border-transparent"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal(docente)}
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#26374c] group-hover:border-[#0d70af] transition-colors duration-300 shadow-md">
              <Image
                src={docente.image}
                alt={`Foto de ${docente.name}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="mt-4 text-center ">
              <p className="text-base sm:text-lg font-semibold text-[#] group-hover:text-[#E1F5FE] transition-colors duration-300">
                {docente.name}
              </p>
              <p className="text-sm text-[#26374c] group-hover:text-[#E1F5FE] mt-1">
                {docente.profession}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {isModalOpen && selectedDocente && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent
              className="bg-[#101827] text-[#E1F5FE] p-8 sm:p-10 md:p-12 lg:p-16 max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl rounded-xl shadow-2xl border border-blue-900/50 overflow-y-auto max-h-[90vh]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:items-start md:space-x-12 lg:space-x-20"
              >
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 leading-tight">
                      {selectedDocente.name}
                    </DialogTitle>
                    <DialogDescription className="text-blue-400 text-xl sm:text-2xl lg:text-3xl font-medium mb-2">
                      {selectedDocente.title}
                    </DialogDescription>
                    <p className="text-gray-400 text-base sm:text-lg lg:text-xl italic">
                      {selectedDocente.profession}
                    </p>
                  </DialogHeader>

                  <Separator className="bg-blue-800/40 my-8 w-full max-w-sm md:max-w-full mx-auto md:mx-0" />

                  <div className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
                    <h4 className="font-bold text-white text-xl sm:text-2xl lg:text-3xl mb-3">
                      Biografía:
                    </h4>
                    <p>{selectedDocente.bio}</p>
                  </div>

                  <div className="mb-6">
                    <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                      Cursos Dictados:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                      {selectedDocente.courses.map((course, index) => (
                        <CourseCard
                          key={index}
                          name={course.name}
                          url={course.url}
                          imageUrl={course.imageUrl}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 flex flex-col items-center">
                  <div
                    className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] overflow-hidden rounded-full border-4 border-sky-400 mb-8 shadow-[0_0_40px_10px_rgba(125,211,252,0.7)]"
                  >
                    <Image
                      src={selectedDocente.image}
                      alt={`Foto de ${selectedDocente.name}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="filter grayscale hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 30vw"
                    />
                  </div>

                  {(selectedDocente.social?.linkedin ||
                    selectedDocente.social?.facebook ||
                    selectedDocente.social?.twitter ||
                    selectedDocente.social?.instagram) && (
                    <>
                      <Separator className="bg-blue-800/40 my-8 w-full max-w-xs" />
                      <div className="text-center w-full">
                        <h5 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                          Conéctate:
                        </h5>
                        <div className="flex justify-center space-x-6 sm:space-x-10">
                          {selectedDocente.social?.linkedin && (
                            <motion.a
                              href={selectedDocente.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="LinkedIn"
                              whileHover={{ scale: 1.25, y: -7 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <FaLinkedin className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 hover:text-blue-400 transition-colors duration-200" />
                            </motion.a>
                          )}
                          {selectedDocente.social?.facebook && (
                            <motion.a
                              href={selectedDocente.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Facebook"
                              whileHover={{ scale: 1.25, y: -7 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <FaFacebook className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 hover:text-blue-500 transition-colors duration-200" />
                            </motion.a>
                          )}
                          {selectedDocente.social?.twitter && (
                            <motion.a
                              href={selectedDocente.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Twitter (X)"
                              whileHover={{ scale: 1.25, y: -7 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <FaTwitter className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 hover:text-white transition-colors duration-200" />
                            </motion.a>
                          )}
                          {selectedDocente.social?.instagram && (
                            <motion.a
                              href={selectedDocente.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Instagram"
                              whileHover={{ scale: 1.25, y: -7 }}
                              whileTap={{ scale: 0.8 }}
                            >
                              <FaInstagram className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 hover:text-pink-300 transition-colors duration-200" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Docentes;