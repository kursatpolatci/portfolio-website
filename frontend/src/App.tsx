import { Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components/Index";
import {
  AboutPage,
  HomePage,
  ProjectsPage,
} from "./pages/Index.tsx";
import { MainContext, Theme } from "./Context";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  const { theme: mainTheme } = useContext(MainContext)
  const [theme, setTheme] = useState<Theme>(mainTheme);
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark")
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove("dark")
      localStorage.setItem('theme', 'light')
    }
  }, [theme])
  return (
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={{ theme, setTheme}}>
      <div className="max-w-3xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </MainContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
