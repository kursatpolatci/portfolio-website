import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const savedTheme = localStorage.getItem("theme");
const defaultTheme: Theme = (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "dark";

const ThemeContext = createContext<IThemeContext>({
  theme: defaultTheme,
  setTheme: () => {},
});

interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else if (theme === "light") document.body.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);
