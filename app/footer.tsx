'use client';

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiFacebookLogo, PiInstagramLogo, PiLinkedinLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";

const Footer = () => {
  const countryLinks = [
    { name: "PEN", label: "Estás usando EDteam en" },
    { name: "USD", label: "Change to" },
    { name: "EUR", label: "Cambiar a" },
  ];

  const aboutLinks = [
    "Acerca de la empresa",
    "¿Qué es EDteam?",
    "El equipo",
    "Los profesores",
    "Enunciado de misión",
    "Marca y logotipo",
    "Cultura"
  ];

  const connectLinks = [
    { title: "Soporte al cliente", links: ["Política de privacidad", "Términos y condiciones", "Política de reembolsos"] },
    { title: "Servicios para empresas", links: ["Canjear cupones", "Regala cursos", "Sube a premium"] }
  ];

  const productLinks = [
    "Recursos gratis",
    "Cursos gratis",
    "Blog",
    "Conferencias",
    "Comunidad",
    "Cómo instalar la App",
    "Firmas de correo"
  ];

  const socialLinks = [
    { icon: PiFacebookLogo, name: "Facebook" },
    { icon: PiInstagramLogo, name: "Instagram" },
    { icon: PiTwitterLogo, name: "Twitter" },
    { icon: PiLinkedinLogo, name: "LinkedIn" },
    { icon: PiYoutubeLogo, name: "YouTube" }
  ];

  return (
    <footer className="bg-[#E1F5FE] border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Logo y título principal para móviles */}
        <div className="md:hidden flex flex-col items-center mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md p-4 border border-gray-100">
            <div className="relative h-16 w-20">
              <Image
                src="/logoenfermeria.png"
                alt="Logo Asociación de Enfermeros"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-lg font-bold text-[#0d70af] tracking-wider uppercase text-center ml-2">
              ASOCIACIÓN DE<br />ENFERMEROS
            </h1>
          </div>
        </div>

        {/* Selector de país con mejor responsividad */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {countryLinks.map((country, index) => (
              <React.Fragment key={country.name}>
                <button className="text-sm font-medium hover:text-[#0d70af] transition-colors">
                  <span className="text-xs text-gray-500">{country.label}</span> {country.name}
                </button>
                {index < countryLinks.length - 1 && <span className="text-gray-300 hidden sm:inline">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Grid layout mejorado para mejor responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Sección JEDteam */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-[#0d70af]">JEDteam</h2>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-600 hover:text-[#0d70af] hover:underline transition-colors flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Conecta con EDteam */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-[#0d70af]">Conecta con EDteam</h2>
            <div className="space-y-6">
              {connectLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-medium mb-3 text-gray-700">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <Link href="#" className="text-gray-600 hover:text-[#0d70af] hover:underline transition-colors flex items-center">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2"></span>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Nuestros productos */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-[#0d70af]">Nuestros productos</h2>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-600 hover:text-[#0d70af] hover:underline transition-colors flex items-center">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0d70af] mr-2"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo y redes sociales - Oculto en mobile (ya mostrado arriba) */}
          <div className="hidden md:flex flex-col items-start bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center bg-white rounded-lg shadow-sm p-3 mb-6">
              <div className="relative h-14 w-16">
                <Image
                  src="/logoenfermeria.png"
                  alt="Logo Asociación de Enfermeros"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-base font-bold text-[#0d70af] tracking-wider uppercase ml-2">
                ASOCIACIÓN DE<br />ENFERMEROS
              </h1>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Comprometidos con la excelencia en la formación y el desarrollo profesional de enfermeros.
            </p>
            <div className="flex gap-4 mt-auto">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name}
                  href="#"
                  className="text-gray-500 hover:text-[#0d70af] transition-colors bg-white p-2 rounded-full shadow-sm"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Redes sociales en móvil - Se muestran en el centro */}
        <div className="md:hidden flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <Link 
              key={social.name}
              href="#"
              className="text-gray-500 hover:text-[#0d70af] transition-colors bg-white p-3 rounded-full shadow-sm"
              aria-label={social.name}
            >
              <social.icon size={24} />
            </Link>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Copyright y legal - Reorganizado para mejor visualización en móvil */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-gray-500 text-sm mb-6 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} JEDteam. Todos los derechos reservados.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <Link href="#" className="text-gray-500 hover:text-[#0d70af] text-sm">
              Términos de servicio
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="#" className="text-gray-500 hover:text-[#0d70af] text-sm">
              Política de privacidad
            </Link>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Link href="#" className="text-gray-500 hover:text-[#0d70af] text-sm">
              Mapa del sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;