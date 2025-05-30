// Componente del servidor (NO uses 'use client' aquí)

import AboutClient from "./AboutClient";

export const metadata = {
  title: "Sobre Nosotros | Cursos y Diplomados para Enfermeros - JEDteam",
  description: "Descubre quiénes somos en JEDteam...",
  keywords: [
    "cursos para enfermeros",
    "diplomados en enfermería",
    "JEDteam",
    "formación en salud",
    "educación para enfermeros",
    "capacitaciones en enfermería"
  ],
  openGraph: {
    title: "Sobre Nosotros | Cursos y Diplomados para Enfermeros - JEDteam",
    description: "Conoce nuestra historia y misión en JEDteam...",
    url: "https://tu-dominio.com/about",
    siteName: "JEDteam",
    images: [
      {
        url: "https://tu-dominio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JEDteam - Cursos para Enfermeros"
      }
    ],
    locale: "es_PE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Cursos y Diplomados para Enfermeros - JEDteam",
    description: "Conoce nuestra misión en JEDteam...",
    images: ["https://tu-dominio.com/og-image.jpg"]
  },
  alternates: {
    canonical: "https://tu-dominio.com/about"
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
