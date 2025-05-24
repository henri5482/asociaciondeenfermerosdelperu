"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Curso } from "../types/curso";

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Función de filtrado simple
  const filterCourses = (term: string, cursosList: Curso[]) => {
    if (!term.trim()) return cursosList;
    
    const lowerTerm = term.toLowerCase();
    return cursosList.filter((curso) => {
      return (
        curso.name?.toLowerCase().includes(lowerTerm) ||
        curso.descripcion?.toLowerCase().includes(lowerTerm) ||
        curso.category?.toLowerCase().includes(lowerTerm) ||
        curso.learnings?.some(learning => 
          learning?.toLowerCase().includes(lowerTerm)
        ) ||
        curso.profesores?.some(profesor => 
          profesor.nombre?.toLowerCase().includes(lowerTerm)
        )
      );
    });
  };

  // Manejar cambios en el buscador
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = filterCourses(value, cursos);
    setFilteredCursos(filtered);
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredCursos(cursos);
  };

  // Cargar datos iniciales
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/coursesall.json");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCursos(data);
        setFilteredCursos(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error al cargar"));
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="container mx-auto max-sm:px-4 py-12">
      <h2 className="text-5xl font-extrabold text-center text-white mb-16 drop-shadow-lg">
        Explora Nuestros Cursos Exclusivos
      </h2>

      <SearchBar
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        onClear={clearSearch}
      />

      <SearchResults count={filteredCursos.length} searchTerm={searchTerm} />

      <CourseGrid cursos={filteredCursos} searchTerm={searchTerm} />
    </div>
  );
};

// Componentes separados para mejor organización

const LoadingMessage = () => (
  <div className="text-center text-white py-10 text-2xl font-semibold">
    Cargando cursos...
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="text-center text-red-500 py-10 text-2xl font-semibold">
    Error: {message}
  </div>
);

const SearchBar = ({
  searchTerm,
  onChange,
  onClear
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) => (
  <div className="mb-10 flex justify-center relative max-w-lg mx-auto">
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar cursos..."
        className="w-full pl-12 pr-10 py-4 rounded-full border border-gray-600 bg-[#0f1e26] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        value={searchTerm}
        onChange={onChange}
        aria-label="Buscar cursos"
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  </div>
);

const SearchResults = ({ count, searchTerm }: { count: number; searchTerm: string }) => (
  searchTerm && (
    <div className="text-center text-gray-400 mb-6">
      {count} {count === 1 ? "curso encontrado" : "cursos encontrados"}
    </div>
  )
);

const CourseGrid = ({ cursos, searchTerm }: { cursos: Curso[]; searchTerm: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-10">
    {cursos.length > 0 ? (
      cursos.map((curso) => <CourseCard key={curso.id} curso={curso} />)
    ) : (
      <div className="col-span-full text-center text-gray-400 text-xl py-10">
        {searchTerm
          ? "No se encontraron cursos"
          : "No hay cursos disponibles"}
      </div>
    )}
  </div>
);

const CourseCard = ({ curso }: { curso: Curso }) => {
  const finalPrice = curso.precio * (1 - (curso.descuento || 0));

  return (
    <Link href={`/cursosall/${curso.slug}`} passHref>
      <div className="bg-[#0f1e26] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2 cursor-pointer group">
        <div className="relative w-full aspect-video bg-[#0f1e26] overflow-hidden">
          <Image
            src={curso.src}
            alt={curso.name || "Curso"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {curso.descuento && curso.descuento > 0 && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              -{Math.round(curso.descuento * 100)}%
            </span>
          )}
        </div>

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

          {curso.details && (
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
          )}

          <div className="mt-auto flex items-center justify-between">
            <p className="text-2xl font-extrabold text-green-400">
              S/{finalPrice.toFixed(2)}
            </p>
            {curso.descuento && curso.descuento > 0 && (
              <p className="text-lg text-gray-600 line-through">
                S/{curso.precio.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cursos;