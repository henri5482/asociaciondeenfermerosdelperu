"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

// --- Interfaces de Datos (deben ser consistentes con la de CourseDetail) ---
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
  temarios: Temario[];
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
}
// --- Fin de Interfaces ---

export function Projects() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        // En el lado del cliente, la ruta relativa '/data/courses.json'
        // funcionará siempre que el archivo esté en 'public/data/courses.json'.
        const response = await fetch('/data/courses.json');
        if (!response.ok) {
          throw new Error(`Error HTTP! estado: ${response.status} - ${response.statusText}`);
        }
        const data: Course[] = await response.json();
        setCourses(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        // Asegúrate de que el error sea más informativo
        setError(`Error al cargar los cursos: ${e.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar

  if (loading) return <div className="text-white text-center py-20">Cargando cursos...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (courses.length === 0) return <div className="text-gray-400 text-center py-20">No hay cursos disponibles.</div>;

  return (
    <section className="w-full bg-[#0f1e26] py-12 md:py-20 px-4 md:px-8 lg:px-16 flex justify-center items-center">
      <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-7xl">
        <CarouselContent>
          {courses.map((course) => (
            <CarouselItem key={course.id} className="md:basis-full">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-[#1a2c3b] rounded-2xl p-6 md:p-10 shadow-2xl transition-all">
                {/* Imagen como Link */}
                <Link
                  href={`/cursos/${course.slug}`}
                  className="w-full md:w-1/2 h-64 sm:h-80 relative rounded-xl overflow-hidden shadow-lg order-1 md:order-2"
                  aria-label={`Ver detalles de ${course.titulo}`}
                >
                  <Image
                    src={course.src}
                    alt={course.name}
                    fill
                    className="object-cover transition duration-300 ease-in-out hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </Link>

                <div className="w-full md:w-1/2 space-y-4 md:space-y-5 text-white order-2 md:order-1">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold inline-block shadow-md">
                    PRÓXIMO LANZAMIENTO
                  </span>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug">
                    {course.titulo}
                  </h2>

                  <p className="text-gray-300 text-sm">{course.fechatext}</p>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {course.descripcion}
                  </p>

                  <Link
                    href={`/cursos/${course.slug}`}
                    className="text-cyan-300 font-semibold underline hover:text-cyan-200 transition text-sm md:text-base block"
                  >
                    Más detalles
                  </Link>

                  {/* Botón como Link */}
                  <Link href={`/cursos/${course.slug}`} passHref>
                    <Button
                      className="w-full md:w-auto mt-4 md:mt-6 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold transition transform hover:scale-105 text-sm md:text-base"
                      asChild
                    >
                      <span>🛒 Compra tu entrada ahora</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:flex absolute left-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="hidden lg:flex absolute right-[-3rem] top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>
    </section>
  );
}