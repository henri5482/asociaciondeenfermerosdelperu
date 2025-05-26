import Footer from "../footer";

import Navbar from "../navbar";
import Planes from "../planes";
import Celular from "./celular";
import Certificado from "./certificado";
import Informacion from "./informacion";
import Sellos from "./sellos";

const Projects = () => {
  return (
    <div className="bg-[#E1F5FE]">
      <Navbar />
      <Sellos />
      <Certificado />
      <Celular />
      <Informacion />
      <Planes />
      <Footer />
    </div>
  );
};

export default Projects;
