import { Contact, Footer, Intro, Navbar, Projects, Skills } from "../components/common";

const HomePage: React.FC<{ path: string }> = ({ path }) => {
  return (
    <div className="max-md:px-6">
      <Navbar />
      <div className="flex flex-col gap-12 py-12">
        {path === "/" && (
          <>
            <Intro />
            <Contact />
          </>
        )}
        {path === "/about" && (
          <>
            <Skills />
          </>
        )}
        {path === "/projects" && (
          <>
            <Projects />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
