import IntroEdit from "../components/admin/IntroEdit";
import ProjectsEdit from "../components/admin/ProjectsEdit";
import SkillsEdit from "../components/admin/SkillsEdit";

const AdminPage: React.FC<{path: string}> = ({ path }) => {
  if (path === "/admin")
    return (
      <>
        <IntroEdit />
      </>
    );
  else if (path === "/admin-about")
    return (
      <>
        <SkillsEdit />
      </>
    );
  else if (path === "/admin-projects")
    return (
      <>
        <ProjectsEdit />
      </>
    );
};

export default AdminPage;
