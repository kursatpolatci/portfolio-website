import { Contact, Intro, Projects, Skills } from "../components/common/Components";

interface IProps {
  path: string;
}

const HomePage: React.FC<IProps> = ({ path }) => {
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
