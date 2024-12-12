import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../common/ThemeToggleButton";
import { TbLogout2 } from "react-icons/tb";
import { useLogout } from "../../hooks/AuthHooks";

const NavbarEdit = () => {
  const [activeLink, setActiveLink] = useState<string>("Intro");
  const location = useLocation();
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/admin") setActiveLink("Intro");
    else if (location.pathname === "/admin-about") setActiveLink("About");
    else if (location.pathname === "/admin-projects") setActiveLink("Projects");
  }, [location]);

  const Links: {to: string, name: string}[] = [
    { to: "/admin", name: "Intro" },
    { to: "/admin-about", name: "About" },
    { to: "/admin-projects", name: "Projects" },
  ];
  const handleLogout = async (): Promise<void> => {
    try {
      const res = await logout();
      console.log(res);
      navigate("/")
    } catch (error: unknown) {
      console.error(`Èrror in handleLogout: `, error);
    }
  };
  return (
    <div className="flex items-center justify-between gap-32 pt-12 px-5 lg:px-0">
      <div className="flex gap-4">
        {Links.map((item, id) => {
          return (
            <Link
              to={item.to}
              key={id}
              className={`relative group ${
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
      <div className="flex gap-3">
        <TbLogout2
          size={24}
          onClick={handleLogout}
          className="dark:text-dark-secondary text-light-secondary cursor-pointer"
        />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default NavbarEdit;
