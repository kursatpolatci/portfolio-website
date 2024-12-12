import { Contact, Intro, Projects, Skills } from "../components/common";

const HomePage: React.FC<{ path: string }> = ({ path }) => {
  if (path === "/")
    return (
      <>
        <Intro />
        <Contact />
      </>
    );
  else if (path === "/about")
    return (
      <>
        <Skills />
      </>
    );
  else if (path === "/projects")
    return (
      <>
        <Projects />
      </>
    );
};

export default HomePage;
