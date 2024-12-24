import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './ThemeContext';
import { HomePage, AdminPage, LoginPage } from './pages';
import { useCheckAuth } from './hooks/AuthHooks';
import { LoadingSpinner } from './components/common/index';

function App() {
  const { data: authUser, isLoading } = useCheckAuth();
  return (
    <ThemeProvider>
      <div className="max-w-3xl min-h-screen mx-auto relative">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <Routes>
            {['/', '/about', '/projects']?.map((path) => (
              <Route key={path} path={path} element={<HomePage path={path} />} />
            ))}
            {['/admin', '/admin-about', '/admin-projects']?.map((path) => (
              <Route key={path} path={path} element={authUser ? <AdminPage path={path} /> : <Navigate to="/login" />} />
            ))}
            <Route path="/login" element={authUser ? <Navigate to="/admin" replace /> : <LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
