'use client';

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiFacebookLogo, PiInstagramLogo, PiLinkedinLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";
import { FaChevronUp } from 'react-icons/fa'; // For the optional back to top button

const Footer = () => {
  // Data for currency/country links
  const countryLinks = [
    { name: "PEN", label: "Estás usando EDteam en" },
    { name: "USD", label: "Cambiar a" },
    { name: "EUR", label: "Cambiar a" },
  ];

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
    // Main footer container with a slightly deeper blue for better contrast and blend
    <footer className="bg-[#D2EFFF] border-t border-gray-200 text-gray-800"> {/* Changed background to a slightly deeper, richer light blue */}
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Top section: Logo and optional "Back to Top" for desktop */}
        <div className="hidden md:flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="relative h-16 w-20 flex-shrink-0">
              <Image
                src="/logoenfermeria.png"
                alt="Logo Asociación de Enfermeros"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-extrabold text-[#0d70af] tracking-wide uppercase ml-3">
              ASOCIACIÓN DE<br />ENFERMEROS
            </h1>
          </div>
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
          <div className="flex items-center bg-white rounded-lg shadow-md p-3 border border-gray-100 max-w-sm w-full justify-center">
            <div className="relative h-12 w-14 flex-shrink-0"> {/* Smaller logo for mobile */}
              <Image
                src="/logoenfermeria.png"
                alt="Logo Asociación de Enfermeros"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-base font-bold text-[#0d70af] tracking-wider uppercase text-center ml-2">
              ASOCIACIÓN DE<br />ENFERMEROS
            </h1>
          </div>
        </div>

        {/* Country/Currency Selector - More compact on mobile */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-2">
            {countryLinks.map((country, index) => (
              <React.Fragment key={country.name}>
                <button className="text-sm font-medium text-gray-600 hover:text-[#0d70af] transition-colors whitespace-nowrap">
                  <span className="text-xs text-gray-500">{country.label}</span> {country.name}
                </button>
                {index < countryLinks.length - 1 && <span className="text-gray-300 hidden sm:inline">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Grid Layout for Navigation Links */}
        {/* Removed bg-white, shadow-sm, border-gray-100 from grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"> {/* Increased gap slightly for better visual separation without cards */}

          {/* Section: JEDteam (About) */}
          <div className="py-2"> {/* Added vertical padding for spacing instead of card padding */}
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
          {/* Removed bg-white, shadow-sm, border-gray-100 from this div */}
          <div className="hidden md:flex flex-col items-start py-2">
            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              Comprometidos con la excelencia en la formación y el desarrollo profesional de enfermeros.
            </p>
            <div className="flex gap-3 mt-auto">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  // Removed bg-white, shadow-sm, border-gray-100 from social icons
                  className="text-gray-600 hover:text-[#0d70af] transition-colors p-2 rounded-full hover:scale-110 transform transition-transform"
                  aria-label={social.name}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social media for mobile - shown centered and integrated */}
        {/* Removed bg-white, shadow-sm, border-gray-100 from social icons */}
        <div className="md:hidden flex justify-center gap-4 mb-8"> {/* Increased gap for mobile social icons for better touch targets */}
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-gray-600 hover:text-[#0d70af] transition-colors p-3 rounded-full hover:scale-110 transform transition-transform"
              aria-label={social.name}
            >
              <social.icon size={26} /> {/* Slightly larger icons for mobile touch targets */}
            </Link>
          ))}
        </div>

        <Separator className="my-6 bg-gray-300" /> {/* Slightly darker separator for better visibility */}

        {/* Copyright and Legal Links - Improved responsive layout */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-gray-600 text-sm mb-4 md:mb-0 text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} JEDteam. Todos los derechos reservados.
          </div>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 items-center">
            <Link href="#" className="text-gray-600 hover:text-[#0a5c8a] text-sm whitespace-nowrap">
              Términos de servicio
            </Link>
            <span className="hidden sm:inline text-gray-400">|</span> {/* Slightly darker separator for legal links */}
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