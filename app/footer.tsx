'use client';

import { motion } from "framer-motion";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FaChevronUp } from 'react-icons/fa';
import { PiFacebookLogo, PiInstagramLogo, PiLinkedinLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";

const Footer = () => {
  // Data for currency/country links
 

  // Data for "Acerca de" section links
  const aboutLinks = [
    "Acerca de la empresa",
    "¿Qué es EDteam?",
    "El equipo",
    "Los profesores",
    "Enunciado de misión",
    "Marca y logotipo",
    "Cultura"
  ];

  // Data for "Conecta con EDteam" sections
  const connectLinks = [
    { title: "Soporte al cliente", links: ["Política de privacidad", "Términos y condiciones", "Política de reembolsos"] },
    { title: "Servicios para empresas", links: ["Canjear cupones", "Regala cursos", "Sube a premium"] }
  ];

  // Data for "Nuestros productos" section links
  const productLinks = [
    "Recursos gratis",
    "Cursos gratis",
    "Blog",
    "Conferencias",
    "Comunidad",
    "Cómo instalar la App",
    "Firmas de correo"
  ];

  // Data for social media links
  const socialLinks = [
    { icon: PiFacebookLogo, name: "Facebook", href: "#" },
    { icon: PiInstagramLogo, name: "Instagram", href: "#" },
    { icon: PiTwitterLogo, name: "Twitter", href: "#" },
    { icon: PiLinkedinLogo, name: "LinkedIn", href: "#" },
    { icon: PiYoutubeLogo, name: "YouTube", href: "#" }
  ];

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Main footer container with a refined blue background for a softer, integrated look
    <footer className="bg-[#E7F6FE] border-t border-[#CCEBFD] text-gray-800"> {/* Softer, lighter blue for base */}
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Top section: Logo (desktop) and "Back to Top" button */}
        <div className="hidden md:flex justify-between items-center mb-10">
          <Link href="/" className="flex items-center group relative h-16 w-64 lg:w-72 xl:w-80"> {/* Adjusted size for desktop logo */}
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Image
                src="/logo02.webp" // Using the combined logo
                alt="Logo Asociación de Enfermeros"
                fill
                sizes="(max-width: 768px) 256px, (max-width: 1200px) 288px, 320px"
                className="object-contain object-left transition-transform group-hover:scale-105"
                priority
              />
            </motion.div>
          </Link>
          <button
            onClick={scrollToTop}
            className="flex items-center text-sm font-medium text-[#0d70af] hover:text-[#0a5c8a] transition-colors group"
            aria-label="Volver arriba"
          >
            Volver arriba
            <FaChevronUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Logo and Title - Simplified and more compact */}
        <div className="flex flex-col items-center mb-8 md:hidden">
          <Link href="/" className="flex items-center group relative h-14 w-56"> {/* Adjusted size for mobile logo */}
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Image
                src="/logo02.webp" // Using the combined logo
                alt="Logo Asociación de Enfermeros"
                fill
                sizes="(max-width: 768px) 224px, (max-width: 1200px) 224px, 224px"
                className="object-contain object-left transition-transform group-hover:scale-105"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Country/Currency Selector */}

        {/* Main Grid Layout for Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Section: JEDteam (About) */}
          <div className="py-2">
            <h2 className="text-lg font-bold mb-4 text-[#0d70af]">JEDteam</h2>
            <nav>
              <ul className="space-y-3">
                {aboutLinks.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-700 hover:text-[#0a5c8a] hover:underline transition-colors flex items-center text-sm group">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2 flex-shrink-0 group-hover:bg-[#0a5c8a] transition-colors"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Section: Conecta con EDteam */}
          <div className="py-2">
            <h2 className="text-lg font-bold mb-4 text-[#0d70af]">Conecta con EDteam</h2>
            <nav className="space-y-6">
              {connectLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-medium mb-3 text-gray-700 text-base">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-gray-700 hover:text-[#0a5c8a] hover:underline transition-colors flex items-center text-sm group">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2 flex-shrink-0 group-hover:bg-[#0a5c8a] transition-colors"></span>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Section: Nuestros productos */}
          <div className="py-2">
            <h2 className="text-lg font-bold mb-4 text-[#0d70af]">Nuestros productos</h2>
            <nav>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-700 hover:text-[#0a5c8a] hover:underline transition-colors flex items-center text-sm group">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2 flex-shrink-0 group-hover:bg-[#0a5c8a] transition-colors"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About description and Social Media - visible on desktop, hidden on mobile */}
          <div className="hidden md:flex flex-col items-start py-2">
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              Comprometidos con la excelencia en la formación y el desarrollo profesional de enfermeros.
            </p>
            <div className="flex gap-3 mt-auto">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-[#0d70af] transition-colors p-2 rounded-full hover:bg-[#CCEBFD] transform transition-transform" // Added subtle background hover
                  aria-label={social.name}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social media for mobile - shown centered and integrated */}
        <div className="md:hidden flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-gray-600 hover:text-[#0d70af] transition-colors p-3 rounded-full hover:bg-[#CCEBFD] transform transition-transform" // Added subtle background hover
              aria-label={social.name}
            >
              <social.icon size={26} />
            </Link>
          ))}
        </div>

        <Separator className="my-6 bg-gray-300" />

        {/* Copyright and Legal Links - Improved responsive layout */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-gray-600 text-sm mb-4 md:mb-0 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} JEDteam. Todos los derechos reservados.
          </div>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 items-center">
            <Link href="#" className="text-gray-600 hover:text-[#0a5c8a] text-sm whitespace-nowrap">
              Términos de servicio
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="#" className="text-gray-600 hover:text-[#0a5c8a] text-sm whitespace-nowrap">
              Política de privacidad
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span>
            <Link href="#" className="text-gray-600 hover:text-[#0a5c8a] text-sm whitespace-nowrap">
              Mapa del sitio
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;