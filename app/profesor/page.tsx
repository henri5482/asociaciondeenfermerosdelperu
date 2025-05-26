import Footer from "../footer";
import Navbar from "../navbar";
import Beneficios from "./beneficios";
import Contacto from "./contacto";
import Hero from "./hero";
import Imagenes from "./imagenes";



const Home = () => {
  return ( <div>
 <Navbar />
 <Hero />
 <Imagenes />
 <Beneficios/>
 <Contacto />
 <Footer />
  </div> );
}
 
export default Home;