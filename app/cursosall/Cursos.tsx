"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { useEffect, useState } from "react";
import { Curso } from "../types/curso";

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        // Ensure this path matches your JSON file in public/data
        const response = await fetch("/data/coursesall.json"); // Or "/data/courses.json" if that's your main file
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Curso[] = await response.json();
        setCursos(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-10">Cargando cursos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error al cargar los cursos: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        Explora Nuestros Cursos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cursos.map((curso) => {
          const finalPrice = curso.precio * (1 - curso.descuento);

          return (
            // Wrap the entire card with a Link component
            <Link href={`/cursosall/${curso.slug}`} key={curso.id}>
              <div
                className="bg-[#1f2937] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105" // Added cursor-pointer and hover:scale-105 for visual feedback
              >
                {/* Course Image */}
                <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center rounded-t-xl overflow-hidden">
                  <Image
                    src={curso.src}
                    alt={curso.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300" // Removed hover:scale-105 here as it's now on the parent div
                  />
                </div>

                {/* Course Content */}
                <div className="p-6 flex-grow flex flex-col">
                  {/* Category Tag */}
                  <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-2">
                    {curso.category}
                  </span>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {curso.name}
                  </h3>

                  {/* Course Description */}
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                    {curso.descripcion}
                  </p>

                  {/* Course Details (Date, Duration, Level) */}
                  <div className="text-gray-500 text-xs space-y-1 mb-4">
                    <p><span className="font-semibold text-gray-300">Fecha:</span> {curso.details.date}</p>
                    <p><span className="font-semibold text-gray-300">Duración:</span> {curso.details.duration}</p>
                    <p><span className="font-semibold text-gray-300">Nivel:</span> {curso.details.level}</p>
                  </div>

                  {/* Price Information */}
                  <div className="mt-auto pt-4 border-t border-gray-700 flex items-baseline justify-between">
                    <div>
                      <p className="text-lg font-bold text-green-400">
                        ${finalPrice.toFixed(2)}
                      </p>
                      {curso.descuento > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          ${curso.precio.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {/* Action Button - This button is now part of the clickable card, consider if you still need it or want it as a separate click target */}
                    {/* If you want the button to be a *separate* link, you'll need to prevent event bubbling */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out text-sm"
                            onClick={(e) => { e.stopPropagation(); /* Add specific button action here if needed */ }}>
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Cursos;