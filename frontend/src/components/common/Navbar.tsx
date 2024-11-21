import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import { ILinks } from "../../utils/types";
import { GrUserAdmin } from "react-icons/gr";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setActiveLink("Home");
    else if (location.pathname === "/about") setActiveLink("About");
    else if (location.pathname === "/projects") setActiveLink("Projects");
  }, [location]);

  const Links: ILinks[] = [
    { to: "/", name: "Home" },
    { to: "/about", name: "About" },
    { to: "/projects", name: "Projects" },
  ];
  const handleLogin = () => {
    window.location.href = "/admin";
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
        <GrUserAdmin
          size={24}
          onClick={handleLogin}
          className="dark:text-dark-secondary text-light-secondary cursor-pointer"
        />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Navbar;
