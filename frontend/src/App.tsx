import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeContext";
import { HomePage, AdminPage } from "./pages/barrel";
import { Navbar, Footer } from "./components/common";
import { NavbarEdit } from "./components/admin";
import { useCheckAuth } from "./hooks/AuthHooks";
import Login from "./components/admin/Login";

function App() {
  const { data: authUser, isLoading } = useCheckAuth();
  if (isLoading) return <div className="dark:bg-dark-primary bg-light-primary" />;
  return (
    <ThemeProvider>
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          {["/", "/about", "/projects"]?.map((path) => (
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
          {["/admin", "/admin-about", "/admin-projects"]?.map((path) => (
            <Route
              key={path}
              path={path}
              element={
                authUser ? (
                  <>
                    <NavbarEdit />
                    <AdminPage path={path} />
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
