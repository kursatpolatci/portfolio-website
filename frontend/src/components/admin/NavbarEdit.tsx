import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../common/ThemeToggleButton";
import { useLogout } from "../../hooks/AuthHooks";
import { GoHome } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
const NavbarEdit = () => {
  const [activeLink, setActiveLink] = useState<string>("Intro");
  const location = useLocation();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") setActiveLink("Intro");
    else if (location.pathname === "/admin-about") setActiveLink("About");
    else if (location.pathname === "/admin-projects") setActiveLink("Projects");
  }, [location]);

  const Links: { to: string; name: string }[] = [
    { to: "/admin", name: "Intro" },
    { to: "/admin-about", name: "About" },
    { to: "/admin-projects", name: "Projects" },
  ];
  const handleLogout = async (): Promise<void> => {
    try {
      const res = await logout();
      console.log(res);
      navigate("/");
    } catch (error: unknown) {
      console.error(`Èrror in handleLogout: `, error);
    }
  };
  return (
    <div className="flex items-center justify-between max-md:px-6 max-md:text-sm py-12">
      <div className="flex gap-4">
        {Links.map((item, id) => {
          return (
            <Link
              to={item.to}
              key={id}
              className={`relative group font-medium ${
                activeLink === item.name
                  ? "text-light-secondary dark:text-dark-secondary"
                  : "text-light-fifth dark:text-dark-fifth"
              }`}
              onClick={() => setActiveLink(item.name)}
            >
              {item.name}
              <span
                className={` absolute left-0 bottom-0 w-0 h-[1px] ${
                  activeLink === item.name
                    ? "bg-light-secondary dark:bg-dark-secondary"
                    : "bg-light-fifth dark:bg-dark-fifth"
                } transition-all duration-300 group-hover:w-full`}
              />
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 items-center justify-center">
        <GoHome
          onClick={() => {
            navigate("/");
          }}
          className="toggle-button"
        />
        <TbLogout2 onClick={handleLogout} className="toggle-button" />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default NavbarEdit;
