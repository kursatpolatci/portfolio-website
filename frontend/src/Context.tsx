import { createContext } from "react";

type Theme = "dark" | "light";

interface MainContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void
}

const savedTheme = localStorage.getItem('theme');
const theme: Theme = (savedTheme === "dark" || savedTheme === "light") ? savedTheme : "dark"
if (!savedTheme) {
    localStorage.setItem('theme', 'dark')
}

const MainContext = createContext<MainContextType>({
  theme: theme,
  setTheme: () => {}
});

export { MainContext };
export type { Theme };
