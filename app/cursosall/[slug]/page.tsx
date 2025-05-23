import Footer from "@/app/footer";
import Navbar from "@/app/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import fs from "fs/promises";
import Image from "next/image";
import Link from "next/link";
import path from "path";

// Interfaces
interface Temario {
  title: string;
  items: string[];
}

interface CourseDetails {
  date: string;
  duration: string;
  level: string;
  offer?: string;
}

interface Profesor {
  nombre: string;
  imagen: string;
  usuarioSocial?: string;
  enlacePerfil?: string;
}

interface Course {
  id: string;
  about?: string;
  slug: string;
  src: string;
  name: string;
  precio?: number;
  descuento?: number;
  titulo: string;
  descripcion: string;
  fechatext: string;
  docente?: string;
  docenteImage?: string;
  docenteBio?: string;
  profesores?: Profesor[];
  paraQuienEs?: string[];
  conocimientosPrevios?: string[];
  fecha: string;
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  temarios: Temario[];
  category?: string;
}

// Function to get all courses
async function getAllCourses(): Promise<Course[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "coursesall.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const courses: Course[] = JSON.parse(fileContent);
    return courses;
  } catch (error) {
    console.error(`Error al cargar todos los cursos desde el archivo:`, error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "coursesall.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const courses: Course[] = JSON.parse(fileContent);
    return courses.map((course) => ({
      slug: course.slug,
    }));
  } catch (error) {
    console.error(
      `Error al cargar los cursos desde el archivo (generateStaticParams):`,
      error
    );
    return [];
  }
}

// Función para mezclar array de manera aleatoria
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default async function CourseDetail({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params;

  const allCourses = await getAllCourses();
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1e26] text-white">
        <p className="text-xl mb-4">Curso no encontrado.</p>
        <Link href="/" className="text-cyan-300 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Lógica para cursos relacionados con selección aleatoria
  let relatedCourses: Course[] = [];
  if (course.category) {
    const sameCategoryCourses = allCourses.filter(
      (c) => c.id !== course.id && c.category === course.category
    );

    // Mezclar y seleccionar hasta 3 cursos diferentes cada vez
    relatedCourses = shuffleArray(sameCategoryCourses).slice(0, 3);
  }

  const startDate = course.details.date;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f1e26] text-white py-12 px-4 md:px-8 lg:px-16 pt-40">
        <div className="max-w-7xl mx-auto bg-[#1a2c3b] rounded-2xl p-6 md:p-10 shadow-2xl">
          {/* Top Section: Title, description, and main content */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Left Column: Textual content */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold inline-block">
                  PRÓXIMO LANZAMIENTO
                </div>
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold inline-block">
                  <span>Las clases empiezan el </span>
                  <span className="font-bold">{startDate}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.titulo}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{course.descripcion}</p>

              {/* "¿Qué aprenderás?" Section */}
              {course.learnings && course.learnings.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">¿Qué aprenderás?</h2>
                  <ul className="space-y-3">
                    {course.learnings.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-cyan-300 mr-2 mt-1">•</span>
                        <span className="text-lg text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full">
                {/* Botón "Ver más cursos" */}
                <Button
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center gap-3 min-w-[240px] justify-center"
                  asChild
                >
                  <Link href="/premium-subscription">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      <path d="M5 3v4" />
                      <path d="M19 17v4" />
                      <path d="M3 5h4" />
                      <path d="M17 19h4" />
                    </svg>
                    <span className="text-lg">Explorar cursos</span>
                  </Link>
                </Button>

                {/* Botón "Comprar curso" */}
                <div className="relative w-full max-w-md">
                  <Button
                    className={`w-full bg-gradient-to-r ${
                      course.descuento
                        ? "from-purple-600 to-indigo-600"
                        : "from-blue-600 to-cyan-600"
                    } hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-between group`}
                    asChild
                  >
                    <Link href="/checkout">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium opacity-90"></div>
                          <div className="text-xl font-bold">
                            {course.descuento && course.precio ? (
                              <>
                                <span className="text-white mr-2">
                                  S/
                                  {(
                                    course.precio *
                                    (1 - course.descuento)
                                  ).toFixed(2)}
                                </span>
                                <span className="line-through text-white/70 text-sm ">
                                  S/{course.precio.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span>S/{course.precio?.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 opacity-80 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </Button>

                  {course.descuento && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full transform rotate-6 shadow-lg flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L13.586 10l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {Math.round(course.descuento * 100)}% OFF
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Image and course details */}
            <div className="bg-[#1f2937] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-2 cursor-pointer group">
              {/* Imagen: RESPONSIVA y no cortada */}
              <div className="relative w-full aspect-video bg-gray-800 overflow-hidden">
                <Image
                  src={course.src}
                  alt={course.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="bg-[#223344] rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Fecha
                    </p>
                    <p className="font-semibold text-lg">
                      {course.details.date}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Duración
                    </p>
                    <p className="font-semibold text-lg">
                      {course.details.duration}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Estudiantes
                    </p>
                    <p className="font-semibold text-lg">
                      {course.remainingSeats}
                    </p>
                  </div>
                  {course.details.offer && (
                    <div className="text-center md:text-left">
                      <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                        Oferta
                      </p>
                      <p className="font-semibold text-lg text-cyan-300">
                        {course.details.offer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Syllabus and Professors Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Syllabus Column (2/3 width) */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold mb-6">Temario del Curso</h2>
              {course.temarios && course.temarios.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {course.temarios.map((temario, index) => (
                    <AccordionItem
                      key={`temario-${index}`}
                      value={`item-${index}`}
                      className="border border-gray-700 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 bg-[#223344] hover:bg-[#2a3c4b] transition-colors duration-200">
                        <span className="text-left">
                          {index + 1}. {temario.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="bg-[#1a2c3b] px-6 py-4">
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                          {temario.items.map((item, itemIndex) => (
                            <li
                              key={`temario-item-${index}-${itemIndex}`}
                              className="text-base"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No hay temario disponible para este curso.
                </p>
              )}

              {/* "Acerca del curso" Section */}
              {course.about && (
                <div className="mt-8 bg-[#223344] rounded-lg p-6 border border-[#2a3c4b]">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    Acerca del curso
                  </h2>
                  <div className="text-gray-300 space-y-4">
                    {course.about.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              {!course.about && (
                <div className="mt-8 bg-[#223344] rounded-lg p-6 border border-[#2a3c4b]">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    Acerca del curso
                  </h2>
                  <p className="text-gray-400">
                    Información detallada no disponible para este curso.
                  </p>
                </div>
              )}
            </div>

            {/* Professors Column (1/3 width) */}
            {course.profesores && course.profesores.length > 0 && (
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6">
                  Profesores del Curso
                </h2>
                <div className="bg-[#223344] rounded-lg p-6 shadow-lg">
                  <div className="space-y-6">
                    {course.profesores.map((profesor, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-cyan-400">
                          <Image
                            src={profesor.imagen}
                            alt={profesor.nombre}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {profesor.nombre}
                          </h3>
                          {profesor.usuarioSocial && (
                            <div className="mt-1">
                              <Link
                                href={profesor.enlacePerfil || "#"}
                                className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  />
                                </svg>
                                {profesor.usuarioSocial}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* "Para quien es este curso" Section */}
                  {course.paraQuienEs && course.paraQuienEs.length > 0 && (
                    <div className="mt-10 border-t-[1px] border-[#566f82] py-4">
                      <h2 className="text-xl font-bold mb-1">
                        ¿Para quién es este curso?
                      </h2>
                      <div className="bg-[#223344] rounded-lg shadow-lg">
                        <ul className="list-disc list-outside p-4 space-y-2 text-gray-300">
                          {course.paraQuienEs.map((item, index) => (
                            <li key={`para-quien-${index}`} className="text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* "Conocimientos Previos" Section */}
                  {course.conocimientosPrevios &&
                    course.conocimientosPrevios.length > 0 && (
                      <div className="mt-10 border-t-[1px] border-[#566f82] py-4 ">
                        <h2 className="text-2xl font-bold mb-1">
                          Conocimientos Previos
                        </h2>
                        <div className="bg-[#223344] rounded-lg shadow-lg">
                          <ul className="list-disc list-outside p-4 space-y-2 text-gray-300">
                            {course.conocimientosPrevios.map((item, index) => (
                              <li
                                key={`conocimientos-${index}`}
                                className="text-sm"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Related Courses Section */}
          {relatedCourses.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Cursos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <Link
                    href={`/cursosall/${relatedCourse.slug}`}
                    key={relatedCourse.id}
                  >
                    <div className="bg-[#223344] rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                      <div className="relative h-40">
                        <Image
                          src={relatedCourse.src}
                          alt={relatedCourse.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {relatedCourse.titulo}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
