import { IntroEdit, NavbarEdit, ProjectsEdit, SkillsEdit } from "../components/admin";
import { Footer } from "../components/common";

const AdminPage: React.FC<{ path: string }> = ({ path }) => {
  return (
    <>
      <NavbarEdit />
      {path === "/admin" && (
        <>
          <IntroEdit />
        </>
      )}
      {path === "/admin-about" && (
        <>
          <SkillsEdit />
        </>
      )}
      {path === "/admin-projects" && (
        <>
          <ProjectsEdit />
        </>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
