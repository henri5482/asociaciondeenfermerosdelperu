// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.asociaciondeenfermerosdelperu.com';


  const courses = [
    { slug: 'cuidados-intensivos-pediatricos', lastMod: '2025-05-27T10:00:00Z' },
    { slug: 'enfermeria-geriatrica', lastMod: '2025-05-20T10:00:00Z' },
    { slug: 'gestion-servicios-enfermeria', lastMod: '2025-05-15T10:00:00Z' },

  ];

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/cursos/${course.slug}`,
    lastModified: course.lastMod,
    changeFrequency: 'weekly', // Indica la frecuencia con la que esperas que esta página cambie
    priority: 0.8, // Indica la importancia relativa de esta URL (0.0 a 1.0)
  }));
  // --- Fin Lógica para Cursos Dinámicos ---

  return [
    // --- Páginas Estáticas Principales ---
    {
      url: baseUrl, // La página de inicio
      lastModified: new Date(), // Fecha actual o de última modificación conocida
      changeFrequency: 'daily',
      priority: 1, // La página de inicio suele tener la prioridad más alta
    },
    {
      url: `${baseUrl}/nosotros`, // Ejemplo de página "Sobre Nosotros"
      lastModified: new Date('2025-01-01T00:00:00Z'), // Si es una página que no cambia mucho
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cursos`, // La página principal que lista todos los cursos
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`, // Página de Contacto
      lastModified: new Date('2025-01-01T00:00:00Z'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    // Si tienes un blog
    {
      url: `${baseUrl}/blog`, // Página del blog
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // --- Fin Páginas Estáticas Principales ---

    // Incluye las URLs de los cursos generadas dinámicamente
    ...courseEntries,

    // AÑADE AQUÍ CUALQUIER OTRA PÁGINA ESPECÍFICA QUE QUIERAS INCLUIR EN EL SITEMAP
  ];
}