import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeContext";
import { HomePage, AdminPage, LoginPage } from "./pages/barrel";
import { useCheckAuth } from "./hooks/AuthHooks";

function App() {
  const { data: authUser, isLoading } = useCheckAuth();
  if (isLoading) return <div className="dark:bg-dark-primary bg-light-primary" />;
  return (
    <ThemeProvider>
      <div className="max-w-3xl mx-auto">
        <Routes>
          {["/", "/about", "/projects"]?.map((path) => (
            <Route key={path} path={path} element={<HomePage path={path} />} />
          ))}
          {["/admin", "/admin-about", "/admin-projects"]?.map((path) => (
            <Route key={path} path={path} element={authUser ? <AdminPage path={path} /> : <Navigate to="/login" />} />
          ))}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
