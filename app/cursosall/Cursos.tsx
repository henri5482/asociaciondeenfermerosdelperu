"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Curso } from "../types/curso";

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCursos, setFilteredCursos] = useState<Curso[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const filterCursos = useCallback((term: string, cursosList: Curso[]) => {
    if (term.trim() === "") {
      setFilteredCursos(cursosList);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const results = cursosList.filter((curso) => {
      const matches = [
        curso.name?.toLowerCase().includes(lowercasedTerm),
        curso.descripcion?.toLowerCase().includes(lowercasedTerm),
        curso.category?.toLowerCase().includes(lowercasedTerm),
        curso.learnings?.some(learning =>
          learning.toLowerCase().includes(lowercasedTerm)
        ),
        curso.temarios?.some(modulo =>
          modulo.title.toLowerCase().includes(lowercasedTerm) ||
          modulo.items.some(item => item.toLowerCase().includes(lowercasedTerm))
        ),
        curso.profesores?.some(profesor =>
          profesor.nombre.toLowerCase().includes(lowercasedTerm)
        )
      ];

      return matches.some(Boolean);
    });

    setFilteredCursos(results);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        filterCursos(value, cursos);
      }, 300)
    );
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredCursos(cursos);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch("/data/coursesall.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Curso[] = await response.json();
        setCursos(data);
        setFilteredCursos(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white py-10 text-2xl font-semibold">
        Cargando cursos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 text-2xl font-semibold">
        Error al cargar los cursos: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-5xl font-extrabold text-center text-white mb-16 drop-shadow-lg">
        Explora Nuestros Cursos Exclusivos
      </h2>

      {/* Buscador */}
      <div className="mb-10 flex justify-center relative max-w-lg mx-auto">
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar cursos por título, descripción, temario, profesores..."
            className="w-full pl-12 pr-10 py-4 rounded-full border border-gray-600 bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <FiX size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      {searchTerm && (
        <div className="text-center text-gray-400 mb-6">
          {filteredCursos.length} {filteredCursos.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
        </div>
      )}

      {/* Cursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredCursos.length > 0 ? (
          filteredCursos.map((curso) => {
            const finalPrice = curso.precio * (1 - curso.descuento);

            return (
              <Link href={`/cursosall/${curso.slug}`} key={curso.id} passHref>
                <div className="bg-[#1f2937] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2 cursor-pointer group">
                  
                  {/* Imagen: RESPONSIVA y no cortada */}
                  <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
                    <Image
                      src={curso.src}
                      alt={curso.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority
                    />
                    {curso.descuento > 0 && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        -{Math.round(curso.descuento * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-7 flex-grow flex flex-col">
                    <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide mb-3">
                      {curso.category}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                      {curso.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-5 flex-grow line-clamp-3">
                      {curso.descripcion}
                    </p>

                    <div className="text-gray-500 text-xs space-y-2 mb-6 border-t border-gray-700 pt-4">
                      <p>
                        <span className="font-semibold text-gray-300">Fecha:</span>{" "}
                        {curso.details.date}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-300">Duración:</span>{" "}
                        {curso.details.duration}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-300">Nivel:</span>{" "}
                        {curso.details.level}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-2xl font-extrabold text-green-400">
                        S/{finalPrice.toFixed(2)}
                      </p>
                      {curso.descuento > 0 && (
                        <p className="text-lg text-gray-600 line-through">
                          S/{curso.precio.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-400 text-xl py-10">
            {searchTerm
              ? "No se encontraron cursos que coincidan con tu búsqueda."
              : "No hay cursos disponibles en este momento."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cursos;
