"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  PiBookOpenText, // Ícono para cursos genéricos
  PiCodeSimple, // Ícono para código/Python
  PiDatabase, // Ícono para bases de datos
} from "react-icons/pi";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description?: string; // Hacemos la descripción opcional
 
  course: string; // Nombre del curso asociado
  courseLink: string; // Enlace al curso
  courseIcon: React.ReactNode; // Ícono del curso
}



const TeamMember: React.FC<TeamMemberProps> = ({
  image,
  name,
  role,
  description,
  // social, // Eliminado del destructuring de props
  course,
  courseLink,
  courseIcon,
}) => {
  return (
    <motion.div
      className="flex flex-col h-full bg-[#327293] rounded-lg shadow-lg overflow-hidden group border border-[#1A362D]"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden w-full h-[250px]">
        <Image
          height={400}
          width={600}
          src={image}
          alt={name}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-white">
        <div>
          <h3 className="font-semibold text-2xl">{name}</h3>
          <p className="font-medium text-lg mt-1 text-gray-300">{role}</p>
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              {description}
            </p>
          )}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between">
          <Link
            href={courseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-white transition-colors duration-300 transform hover:translate-x-1"
          >
            <div className="bg-[#006394]  p-2 rounded-full flex items-center justify-center">
              {courseIcon}
            </div>
            <span className="font-medium text-sm">{course}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
          {/* Los iconos sociales se han eliminado o se pueden reintroducir si es necesario en otro lugar */}
        </div>
      </div>
    </motion.div>
  );
};

const teamMembers: TeamMemberProps[] = [
  {
    name: "Carli Florida",
    role: "Teacher In-house en Platzi",
    image: "/image-4.jpg",
    // social: {}, // La propiedad 'social' en los datos puede quedarse, pero la interface y el destructuring se eliminaron
    course: "Curso de Python",
    courseLink: "#",
    courseIcon: <PiCodeSimple size={20} className="text-[#A2E285]" />,
  },
  {
    name: "Anibal Rojas",
    role: "VP de Ingeniería en Platzi",
    image: "/image-3.jpg",
    // social: {},
    course: "Curso de ChatGPT para Empresas",
    courseLink: "#",
    courseIcon: <PiBookOpenText size={20} className="text-[#A2E285]" />,
  },
  {
    name: "Carolina Castañeda",
    role: "Online Tech Teacher en Platzi",
    image: "/image-2.jpg",
    // social: {},
    course: "Curso de Bases de Datos con SQL",
    courseLink: "#",
    courseIcon: <PiDatabase size={20} className="text-[#A2E285]" />,
  },
  {
    name: "Luis Martinez",
    role: "Platform Engineer en Deel",
    image: "/image-1.jpg",
    // social: {},
    course: "Curso de Django",
    courseLink: "#",
    courseIcon: <PiCodeSimple size={20} className="text-[#A2E285]" />,
  },
];

const Founders = () => {
  return (
    <div className="py-20 bg-[#E1F5FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
            NUESTROS EXPERTOS
          </p>
          <h2 className="text-4xl font-extrabold text-[#006394] sm:text-5xl lg:text-6xl">
            Nuestros profesores son expertos de la industria
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamMember {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Founders;