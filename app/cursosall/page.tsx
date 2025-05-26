"use client";

import Image from "next/image";
import Footer from "../footer";
import Navbar from "../navbar";
import { Projects } from "../projects"; // Asegúrate de que Projects es un componente válido
import Cursos from "./Cursos"; // Importa el componente Cursos

const CursosAllPage = () => {
  return (
    <div className="md:min-h-screen bg-[#26374c] ">
      <Navbar />
      <div className="py-10">
        <Projects />
        <div className="flex flex-col items-center justify-center mt-8">
          <Image src="/banner.png" alt="" width={1500} height={50} />
        </div>
        {/* Aquí se renderiza tu componente Cursos con toda la lógica de búsqueda */}
        <Cursos/>
      </div>
      <Footer />
    </div>
  );
};

export default CursosAllPage;