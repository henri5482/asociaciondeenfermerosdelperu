import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// Importa los componentes de acordeón
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Importa el módulo 'fs' de Node.js para leer archivos locales
import fs from 'fs/promises';
// Importa 'path' para construir rutas de archivo de forma segura
import path from 'path';

interface Temario {
  title: string;
  items: string[];
}

interface CourseDetails {
  date: string;
  duration: string;
  level: string;
  offer: string;
}

interface Course {
  id: string;
  slug: string;
  src: string;
  name: string;
  titulo: string;
  descripcion: string;
  fechatext: string;
  docente: string;
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  temarios: Temario[];
}

// Función para obtener un curso específico por su slug
async function getCourse(slug: string): Promise<Course | null> {
  try {
    // Construye la ruta absoluta al archivo JSON dentro del directorio 'public'
    const filePath = path.join(process.cwd(), 'public', 'data', 'courses.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const courses: Course[] = JSON.parse(fileContent);
    return courses.find((c) => c.slug === slug) || null;
  } catch (error) {
    console.error(`Error al cargar los cursos desde el archivo (getCourse):`, error);
    return null;
  }
}

// Para generar rutas estáticas para cada curso en tiempo de build (recomendado para SEO)
export async function generateStaticParams() {
  try {
    // Construye la ruta absoluta al archivo JSON dentro del directorio 'public'
    const filePath = path.join(process.cwd(), 'public', 'data', 'courses.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const courses: Course[] = JSON.parse(fileContent);
    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error(`Error al cargar los cursos desde el archivo (generateStaticParams):`, error);
    return []; // Retorna un array vacío para evitar errores de build
  }
}

export default async function CourseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: courseSlug } = await params;
  const course = await getCourse(courseSlug);


  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1e26] text-white">
        <p className="text-xl mb-4">Curso no encontrado</p>
        <Link href="/" className="text-cyan-300 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1e26] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-[#1a2c3b] rounded-2xl p-6 md:p-10 shadow-2xl">
        {/* Sección principal del curso: Título, descripción, imagen */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{course.titulo}</h1>
          <p className="text-gray-300 mb-6">{course.descripcion}</p>
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold inline-block">
            PRÓXIMO LANZAMIENTO
          </div>
        </div>

        <div className="w-full h-64 sm:h-96 relative rounded-xl overflow-hidden shadow-lg mb-8">
          <Image
            src={course.src}
            alt={course.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenido principal: Qué aprenderás y la nueva sección de Temario */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">¿Qué aprenderás?</h2>
            <ul className="space-y-2">
              {course.learnings.map((item) => (
                <li key={item} className="flex items-start">
                  <span className="text-cyan-300 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Nuevo Renderizado de Temarios con Accordion --- */}
          <div>
            <h2 className="text-xl font-bold mb-4">Temario del Curso</h2>
            {course.temarios && course.temarios.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {course.temarios.map((temario, index) => (
                  <AccordionItem key={`temario-${index}`} value={`item-${index}`} className="border-b border-gray-700">
                    <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline px-4 py-3 bg-[#1a2c3b] hover:bg-[#2a3c4b] rounded-t-md transition-colors duration-200">
                      {index + 1}. {temario.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-[#1a2c3b] px-4 py-3 pb-4 rounded-b-md">
                      <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                        {temario.items.map((item, itemIndex) => (
                          <li key={`temario-item-${index}-${itemIndex}`}>{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-gray-400">No hay temario disponible para este curso.</p>
            )}
          </div>
          {/* --- Fin del Nuevo Renderizado de Temarios --- */}
        </div>

        {/* Detalles del curso (fecha, duración, nivel, oferta) */}
        <div className="border-t border-gray-700 pt-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(course.details).map(([key, value]) => (
              <div key={key}>
                <p className="text-gray-400 text-sm capitalize">{key}</p>
                <p className={`font-semibold ${key === 'offer' ? 'text-cyan-300' : ''}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Botón de compra */}
        <div className="text-center">
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold py-6 px-8 text-lg transition transform hover:scale-105"
            asChild
          >
            <Link href="/checkout">🛒 Comprar entrada ahora</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}