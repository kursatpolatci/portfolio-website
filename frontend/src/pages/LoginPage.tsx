import { useState } from 'react';
import { errorMessage } from '../lib/utils/error';
import { useLogin } from '../hooks/AuthHooks';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggleButton } from '../components/common';
import { ILoginFormData } from '../lib/types/formdata';

const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const [formData, setFormData] = useState<ILoginFormData>({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      await login(formData);
      navigate('/admin');
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-80 flex flex-col gap-5 max-sm:px-5">
        <div className="flex flex-col items-center justify-center gap-5">
          <ThemeToggleButton />
          <h1>Kürşat Polatcı </h1>
        </div>
        <form onSubmit={handleSubmitLogin}>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChangeLogin}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChangeLogin}
            />
          </div>
          <button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="text-center">
          <Link to="/" className="link">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
