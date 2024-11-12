import { Route, Routes } from "react-router-dom";
import { ScrollToTop, Navbar, Footer } from "./components/index";
import {
  HomePage,
  BlogsPage,
  ProjectsPage,
  BlogDetailPage
} from "./pages/index";
import { MainContext, Theme } from "./Context";
import { useContext, useEffect, useState } from "react";

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
    <MainContext.Provider value={{ theme, setTheme}}>
      <div className="max-w-3xl mx-auto">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </MainContext.Provider>
  );
}

export default App;
