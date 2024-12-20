import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { ThemeToggleButton } from "./index";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState<string>("Home");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") setActiveLink("Home");
    else if (location.pathname === "/about") setActiveLink("About");
    else if (location.pathname === "/projects") setActiveLink("Projects");
  }, [location]);

  const Links: { to: string; name: string }[] = [
    { to: "/", name: "Home" },
    { to: "/about", name: "About" },
    { to: "/projects", name: "Projects" },
  ];
  const handleClickAdmin = () => {
    navigate("/admin");
  };
  return (
    <div className="flex items-center justify-between pt-12">
      <div className="flex gap-4">
        {Links?.map((item, id) => {
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
      <div className="flex gap-4">
        <MdDashboard onClick={handleClickAdmin} className="toggle-button" />
        <ThemeToggleButton />
      </div>
    </div>
  );
};

export default Navbar;
