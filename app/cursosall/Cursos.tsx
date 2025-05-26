"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi"; // Importa FiChevronDown
import { Curso } from "../types/curso";

const Cursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // Estado para la categoría seleccionada

  // Función de filtrado combinada para búsqueda y categoría
  const filterCourses = (term: string, category: string, cursosList: Curso[]) => {
    let currentFiltered = cursosList;

    // 1. Filtrar por categoría primero (si no es 'All')
    if (category && category !== "Todos los cursos") {
      currentFiltered = currentFiltered.filter(
        (curso) => curso.category?.toLowerCase() === category.toLowerCase()
      );
      // console.log(`Filter: Cursos filtrados por categoría "${category}":`, currentFiltered.length); // LOG F3
    }

    // 2. Luego, aplicar el filtro de búsqueda si hay un término
    if (term.trim()) {
      const lowerTerm = term.toLowerCase();
      currentFiltered = currentFiltered.filter((curso) => {
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
      // console.log(`Filter: Cursos filtrados por término "${term}" (después de categoría):`, currentFiltered.length); // LOG F4
    } else {
      // console.log("Filter: El término de búsqueda está vacío. Se muestran los cursos filtrados solo por categoría."); // LOG F5
    }

    return currentFiltered;
  };

  // Manejar cambios en el input del buscador
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log("handleSearchChange: Valor actual del input:", value); // LOG H1
    setSearchTerm(value);
    const filtered = filterCourses(value, selectedCategory, cursos);
    // console.log("handleSearchChange: Estableciendo filteredCursos a", filtered.length, "elementos."); // LOG H2
    setFilteredCursos(filtered);
  };

  // Manejar cambio de categoría desde el selector
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    // console.log("handleCategoryChange: Categoría seleccionada:", category); // LOG CAT1
    setSelectedCategory(category);
    // Vuelve a aplicar el filtro con la nueva categoría y el término de búsqueda actual
    const filtered = filterCourses(searchTerm, category, cursos);
    // console.log("handleCategoryChange: Estableciendo filteredCursos a", filtered.length, "elementos."); // LOG CAT2
    setFilteredCursos(filtered);
  };

  // Limpiar el buscador y restablecer todos los cursos (y categoría a 'All')
  const clearSearch = () => {
    // console.log("clearSearch: Limpiando término de búsqueda y restableciendo cursos."); // LOG C1
    setSearchTerm("");
    setSelectedCategory("Todos los cursos"); // También resetea la categoría a "All"
    // Al limpiar la búsqueda, re-filtra usando el término vacío y la categoría 'All'
    const filtered = filterCourses("", "Todos los cursos", cursos);
    setFilteredCursos(filtered);
    // console.log("clearSearch: filteredCursos restablecido a", cursos.length, "elementos (todos los cursos originales)."); // LOG C2
  };

  // Cargar los datos iniciales de los cursos
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/coursesall.json");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setCursos(data);
        setFilteredCursos(data); // Inicialmente, los cursos filtrados son todos los cursos
        // console.log("useEffect: Datos iniciales cargados.", data.length, "cursos."); // LOG E1
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error al cargar los cursos"));
        // console.error("useEffect: Error al cargar los cursos:", err); // LOG E2
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  // Obtener categorías únicas dinámicamente de los cursos
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    cursos.forEach((curso) => {
      if (curso.category) {
        uniqueCategories.add(curso.category);
      }
    });
    return ["Todos los cursos", ...Array.from(uniqueCategories).sort()]; // 'All' y luego las categorías ordenadas
  }, [cursos]);

  if (loading) {
    return <LoadingMessage />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="container mx-auto max-sm:px-4 py-12">
      <h2 className=" text-3xl md:text-5xl font-extrabold text-center text-white mb-6 md:mb-16 drop-shadow-lg">
        Explora Nuestros Cursos Exclusivos
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center">
        {/* Barra de búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          onChange={handleSearchChange}
          onClear={clearSearch}
        />

        {/* Selector de categorías */}
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* Muestra el número de resultados */}
      <SearchResults count={filteredCursos.length} searchTerm={searchTerm} />

      {/* La grilla de cursos */}
      <CourseGrid cursos={filteredCursos} searchTerm={searchTerm} />
    </div>
  );
};

// --- Componentes Separados ---

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
  // Ajuste el max-w-lg para que coexista mejor con el selector en pantallas grandes
  <div className="relative w-full max-w-md">
    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar cursos..."
      className="w-full pl-12 pr-10 py-4 rounded-full border border-gray-600 bg-[#26374c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
);

// Nuevo componente para el selector de categorías
const CategorySelector = ({
  categories,
  selectedCategory,
  onChange
}: {
  categories: string[];
  selectedCategory: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="relative w-full max-w-sm"> {/* Ajuste el max-w-sm */}
    <select
      value={selectedCategory}
      onChange={onChange}
      className="block w-full appearance-none bg-[#0f1e26] border border-gray-600 text-white py-4 pl-5 pr-10 rounded-full leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
      aria-label="Filtrar por categoría"
    >
      {categories.map((category) => (
        <option key={category} value={category.toLowerCase() === "all" ? "All" : category}>
          {category}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
      <FiChevronDown className="h-5 w-5" />
    </div>
  </div>
);

const SearchResults = ({ count, searchTerm }: { count: number; searchTerm: string }) => (
  searchTerm ? (
    <div className="text-center text-gray-400 mb-6">
      {count} {count === 1 ? "curso encontrado" : "cursos encontrados"}
    </div>
  ) : null
);

const CourseGrid = ({ cursos, searchTerm }: { cursos: Curso[]; searchTerm: string }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-10">
    {cursos.length > 0 ? (
      cursos.map((curso) => <CourseCard key={curso.id} curso={curso} />)
    ) : (
      <div className="col-span-full text-center text-gray-400 text-xl py-10">
        {searchTerm
          ? "No se encontraron cursos con ese criterio de búsqueda."
          : "No hay cursos disponibles para esta categoría."}
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