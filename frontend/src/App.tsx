import { Route, Routes, Navigate } from "react-router-dom";
import { MainContext, Theme } from "./Context";
import { useContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/Pages";
import { Navbar, Footer } from "./components/common/Components";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/AdminPage";
import Sections from "./components/admin/Sections";

const queryClient = new QueryClient();

function App() {
  const { theme: mainTheme } = useContext(MainContext);
  const [theme, setTheme] = useState<Theme>(mainTheme);
  const homePaths = ["/", "/about", "/projects"];
  const adminPaths = ["/admin", "/admin-about", "/admin-projects"];
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <QueryClientProvider client={queryClient}>
      <MainContext.Provider value={{ theme, setTheme }}>
        <div className="max-w-3xl mx-auto">
          <Routes>
            {homePaths?.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <Navbar />
                    <HomePage path={path} />
                    <Footer />
                  </>
                }
              />
            ))}
            {adminPaths?.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <Sections />
                    <AdminPage path={path} />
                    <Footer />
                  </>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Toaster />
      </MainContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
