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
    default: "BLUNKERS Seguridad privada",
    template: "%s | BLUNKERS",
  },
  description: "A full-service digital innovation partner",
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/svg+xml' }],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://blunkers.com'), // Reemplaza con tu dominio real
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