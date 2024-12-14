import { Contact, Footer, Intro, Navbar, Projects, Skills } from "../components/common";

const HomePage: React.FC<{ path: string }> = ({ path }) => {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default HomePage;
