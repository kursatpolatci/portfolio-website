import { useState } from "react";
import { errorMessage } from "../lib/utils/error";
import { useLogin } from "../hooks/AuthHooks";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggleButton } from "../components/common";

const LoginPage = () => {
  const { mutateAsync: login } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await login(formData);
      navigate("/admin");
      console.log(res);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center  text-center">
      <div className="w-full max-w-80">
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
          <button>Login</button>
        </form>
        <Link to="/">
          <p className="link">Back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
