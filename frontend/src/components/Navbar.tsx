import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

interface Links {
  to: string;
  name: string;
  activeLink: (link: string) => void;
}

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>("Home");
  const location = useLocation()

  const handleActiveLink = (activeLink: string): void => {
    setActiveLink(activeLink);
  };

  useEffect(() => {
    if (location.pathname === "/")
        setActiveLink("Home")
    else if (location.pathname === "/about")
        setActiveLink("About")
    else if (location.pathname === "/projects")
        setActiveLink("Projects")
  }, [location])
 
  const NavLinks: Links[] = [
    { to: "/", name: "Home", activeLink: handleActiveLink },
    { to: "/about", name: "About", activeLink: handleActiveLink },
    { to: "/projects", name: "Projects", activeLink: handleActiveLink }
  ];
  return (
    <div className="flex items-center justify-between gap-32 pt-12 px-5 lg:px-0">
      <div className="flex gap-4">
        {NavLinks.map((item, id) => {
          return (
            <Link
              to={item.to}
              key={id}
              className={`relative group ${
                activeLink === item.name ? "text-light-secondary dark:text-dark-secondary" : "text-light-fifth dark:text-dark-fifth"
              }`}
              onClick={() => item.activeLink(item.name)}
            >
              {item.name}
              <span
                className={` absolute left-0 bottom-0 w-0 h-[1px] ${
                  activeLink === item.name ? "bg-light-secondary dark:bg-dark-secondary" : "bg-light-fifth dark:bg-dark-fifth"
                } transition-all duration-300 group-hover:w-full`}
              />
            </Link>
          );
        })}
      </div>
      <div>
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Navbar;
