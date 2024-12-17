import { IntroEdit, NavbarEdit, ProjectsEdit, SkillsEdit } from "../components/admin";
import { Footer } from "../components/common";

const AdminPage: React.FC<{ path: string }> = ({ path }) => {
  return (
    <div className="max-md:px-6">
      <NavbarEdit />
      <div className="flex flex-col gap-12 py-6">
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
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
