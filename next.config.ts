/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Recomendado para Vercel
  images: {
    domains: [], // Añade dominios de imágenes externas si las usas
  },
  // Habilita SWC minificación (mejor rendimiento)
};

module.exports = nextConfig;