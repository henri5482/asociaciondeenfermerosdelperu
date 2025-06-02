import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import FloatingButtons from './floating-buttons';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'], // Especifica los pesos necesarios
});

export const metadata: Metadata = {
  title: {
    default: "Asociación de Enfermeros del Perú | Cursos y Diplomados de Enfermería",
    template: "%s | Asociación de Enfermeros del Perú",
  },
  description: "Potencia tu carrera de enfermería con los mejores cursos, diplomados y especializaciones en Perú. Formación continua, certificaciones y capacitación para enfermeros y estudiantes. ¡Inscríbete hoy!",
  keywords: "cursos de enfermería, enfermería Perú, capacitación enfermeros, especializaciones enfermería, formación enfermeros, Asociación de Enfermeros del Perú, cursos para enfermeras, cursos para estudiantes de enfermería, diplomados enfermería, certificaciones enfermería, enfermería profesional, actualización enfermería, salud Perú",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }], // Standard type for .ico files
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://www.asociaciondeenfermerosdelperu.com'), // <--- ¡IMPORTANTE! REEMPLAZA CON TU DOMINIO REAL
  openGraph: {
    title: 'Asociación de Enfermeros del Perú | Cursos de Enfermería Profesional',
    description: 'Encuentra los mejores cursos y programas de formación para enfermeros y estudiantes de enfermería en Perú. Impulsa tu carrera con nuestra formación de alta calidad.',
    url: 'https://www.asociaciondeenfermerosdelperu.com', // <--- ¡IMPORTANTE! REEMPLAZA CON TU DOMINIO REAL
    siteName: 'Asociación de Enfermeros del Perú',
    images: [
      {
        url: 'https://www.asociaciondeenfermerosdelperu.com/images/og-image.jpg', // <--- RUTA A TU IMAGEN DE OPEN GRAPH
        width: 1200,
        height: 630,
        alt: 'Cursos de Enfermería y Capacitación Profesional en Perú',
      },
    ],
    locale: 'es_PE', // Specifies Spanish, Peru
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asociación de Enfermeros del Perú | Cursos y Diplomados',
    description: 'Potencia tu carrera de enfermería con cursos, diplomados y especializaciones de alta calidad en Perú.',
    creator: '@EnfermerosPeru', // <--- OPCIONAL: REEMPLAZA CON TU USUARIO DE TWITTER
    images: ['https://www.asociaciondeenfermerosdelperu.com/images/twitter-image.jpg'], // <--- RUTA A TU IMAGEN DE TWITTER
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={font.variable}>
      <body className={`${font.className} antialiased`}>
        {children}
        <FloatingButtons /> {/* Render the floating buttons here */}
        <Analytics />
      </body>
    </html>
  );
}