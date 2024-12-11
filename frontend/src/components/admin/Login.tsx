import { useState } from "react";
import { errorMessage } from "../../lib/utils/error";
import { useLogin } from "../../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { mutateAsync: login } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await login(formData);
      navigate("/admin")
      console.log(res);
    } catch (error: unknown) {
      errorMessage(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form className="flex flex-col gap-3" onSubmit={handleSubmitLogin}>
        <h1 className="text-white font-normal text-3xl text-center pb-4">Kürşat Polatcı</h1>
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChangeLogin}
            className="rounded py-1 px-2"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChangeLogin}
            className="rounded py-1 px-2"
          />
        </div>
        <button className="bg-blue-400 text-white rounded p-2 w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
