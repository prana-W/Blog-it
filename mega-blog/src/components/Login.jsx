import React from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = React.useState(null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    setError(null);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md dark:shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Login to Your Account
        </h2>

        {error && (
          <p className="mb-4 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
