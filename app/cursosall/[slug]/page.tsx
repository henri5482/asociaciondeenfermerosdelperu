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
  level: string; // Assuming 'level' is still a detail, even if not explicitly used in your current JSX
  offer?: string; // Made optional as it's conditionally rendered
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
  fechatext: string; // Not currently used in JSX, consider if needed
  docente?: string; // Consider removing if using 'profesores' array exclusively
  docenteImage?: string; // Consider removing if using 'profesores' array exclusively
  docenteBio?: string; // Consider removing if using 'profesores' array exclusively
  profesores?: Profesor[];
  paraQuienEs?: string[];
  conocimientosPrevios?: string[];
  fecha: string; // Not currently used in JSX, 'details.date' is used
  learnings: string[];
  details: CourseDetails;
  remainingSeats: string;
  temarios: Temario[];
  category?: string;
}

// Function to get all courses
async function getAllCourses(): Promise<Course[]> {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "coursesall.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const courses: Course[] = JSON.parse(fileContent);
    return courses;
  } catch (error) {
    console.error(`Error al cargar todos los cursos desde el archivo:`, error);
    // Return an empty array or re-throw the error based on desired error handling strategy
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "coursesall.json");
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

export default async function CourseDetail({
  params,
}: Readonly<{ params: { slug: string } }>) {
  const { slug } = params; // Destructure slug directly

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

  // Logic for filtering related courses by CATEGORY
  let relatedCourses: Course[] = [];
  if (course.category) {
    relatedCourses = allCourses.filter(
      (c) => c.id !== course.id && c.category === course.category
    );
    // Limit related courses to 3
    relatedCourses = relatedCourses.slice(0, 3);
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
              {/* Main short description */}
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
              <div className="flex flex-col items-start gap-4 rounded-xl">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Premium Subscription Button */}
                  <Button
                    className="bg-[#FFC94A] hover:bg-[#E6B342] text-black font-semibold py-5 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2"
                    asChild
                  >
                    <Link href="/premium-subscription">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor" // Use stroke for icons
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none" // Ensure no fill for stroke icons
                        className="lucide lucide-star h-5 w-5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        <path d="M12 17v-4" />
                        <path d="m14.5 12.5-2.5-2.5-2.5 2.5" />
                      </svg>
                      Ver más cursos
                    </Link>
                  </Button>

                  {/* Buy This Course Button */}
                  <Button
                    className="bg-[#2D3748] hover:bg-[#202933] text-white font-semibold py-5 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 border border-gray-600 text-left"
                    asChild
                  >
                    <Link href="/checkout" className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Compra este curso:{" "}
                      {course.descuento && course.precio ? (
                        <>
                          <span className="line-through text-gray-400">
                            S/{course.precio.toFixed(2)}
                          </span>
                          <span className="ml-1">
                            S/{(course.precio * (1 - course.descuento)).toFixed(2)}
                          </span>
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-bold ml-2">
                            Oferta especial
                          </span>
                        </>
                      ) : (
                        <span>S/{course.precio?.toFixed(2)}</span>
                      )}{" "}
                      SOLES
                    </Link>
                  </Button>
                </div>
                <p className="text-sm text-gray-400">
                  * Acceso de por vida solo a este curso
                </p>
              </div>
            </div>

            {/* Right Column: Image and course details */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className="h-64 sm:h-96 relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={course.src}
                  alt={course.name}
                  fill
                  className="object-cover"
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
              {/* Message if 'about' is not available */}
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
                    href={`/cursos/${relatedCourse.slug}`}
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
                        {/* Optional: show short description */}
                        {/* <p className="text-gray-400 text-sm mt-1">{relatedCourse.descripcion}</p> */}
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