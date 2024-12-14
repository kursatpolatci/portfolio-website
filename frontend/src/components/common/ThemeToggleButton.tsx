import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeContext } from "../../ThemeContext";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useThemeContext();

  const handleChangeTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("dark");
  };
  return (
    <div onClick={() => handleChangeTheme()}>
      {theme === "dark" ? (
        <MdLightMode className="toggle-button" />
      ) : (
        <MdDarkMode className="toggle-button" />
      )}
    </div>
  );
};

export default ThemeToggleButton;