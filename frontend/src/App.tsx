import { Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeContext";
import { HomePage, AdminPage } from "./pages/barrel";
import { Navbar, Footer } from "./components/common";
import { NavbarEdit } from "./components/admin";
import Login from "./components/admin/Login";

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
            <Route path="/login" element={<><Login/></>}/>
            {adminPaths?.map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    <NavbarEdit />
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
