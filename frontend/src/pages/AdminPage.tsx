import IntroEdit from "../components/admin/IntroEdit";

interface IProps {
  path: string;
}

const AdminPage: React.FC<IProps> = ({ path }) => {
  if (path === "/admin")
    return (
      <>
        <IntroEdit />
      </>
    );
  else if (path === "/admin-about") return <></>;
  else if (path === "/admin-projects") return <></>;
};

export default AdminPage;
