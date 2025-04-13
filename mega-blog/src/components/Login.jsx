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
    <>
      <p>{error}</p>
      <form onSubmit={handleSubmit(onLogin)}>
        <Input
          label="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        ></Input>

        <Input
          label="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></Input>

        <Button>Login</Button>
      </form>
    </>
  );
}

export default Login;
