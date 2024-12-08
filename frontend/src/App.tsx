import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navbar, Footer } from "./components/common/Components";
import Sections from "./components/admin/AdminNavbar";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./ThemeContext";

const queryClient = new QueryClient();

function App() {
  const homePaths = ["/", "/about", "/projects"];
  const adminPaths = ["/admin", "/admin-about", "/admin-projects"];
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
