import Navbar from "../navbar";
import Culture from "./culture";
import Team from "./team";

const About = () => {
  return (
    <div>
      <Navbar />
      {/* hero section */}
      <div className="pt-32 pb-20 px-6 mx-auto 2xl:w-4/5 md:px-16">
        <div className="mx-auto flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold mb-8">
              Not just a team,
              <br />
              but a family.
            </h1>
            <p className="text-xl text-[#7b7b7b]">
              We are a family of passionate creators who love to build amazing
              products
            </p>
          </div>
        </div>
      </div>

      <Culture />
      <Team />
    </div>
  );
};

export default About;
