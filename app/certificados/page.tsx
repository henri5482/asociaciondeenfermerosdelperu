import Footer from "../footer";

import Navbar from "../navbar";
import Celular from "./celular";
import Certificado from "./certificado";
import Informacion from "./informacion";
import Sellos from "./sellos";

const Projects = () => {
    return ( <div>
        <Navbar />
        <Sellos/>
        <Certificado/>
        <Celular/>
        <Informacion />

        <Footer />
    </div> );
}
 
export default Projects;