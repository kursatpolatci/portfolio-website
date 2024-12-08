import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeContext } from "../../ThemeContext";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useThemeContext();

  const handleChangeTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("dark");
  };
  return (
    <button onClick={() => handleChangeTheme()}>
      {theme === "dark" ? (
        <MdLightMode color="white" size={24} className="hover:scale-125 transition-all duration-300" />
      ) : (
        <MdDarkMode color="black" size={24} className="hover:scale-125 transition-all duration-300" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
