"use client";

import Image from "next/image";
import Footer from "../footer";
import Navbar from "../navbar";
import { Projects } from "../projects";
import Cursos from "./Cursos";

const CursosAllPage = () => {
  return (
    <div className="md:min-h-screen bg-[#1a2c3b] ">
      <Navbar />
      <div className="py-10">
        <Projects />
        <div className="flex flex-col items-center justify-center mt-8">
          <Image src="/banner.png" alt="" width={1500} height={50} />
        </div>
        <Cursos/> {/* This is where your Cursos component will render */}
      </div>
      <Footer />
    </div>
  );
};

export default CursosAllPage;