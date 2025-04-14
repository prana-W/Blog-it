import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Logo from './Logo';
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSignUp = async (data) => {
    setError(null);
    try {
      const response = await authService.createAccount(data);

      if (response) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[120px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-500 transition duration-200"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSignUp)}>
          <div className="space-y-5 mt-6">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg py-2">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
