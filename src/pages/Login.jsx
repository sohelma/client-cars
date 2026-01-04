// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import Loader from "../components/Loader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password Format",
        text: "Password must be at least 6 characters and contain both uppercase and lowercase letters.",
      });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: "success",
        title: "Google Login Successful!",
        text: "Welcome!",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
  <div className="flex justify-center items-center min-h-screen 
                  bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100">
    <div className="w-full max-w-md p-8 
                    bg-white/90 backdrop-blur
                    rounded-2xl shadow-2xl">

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Login to your account
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">

        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2.5 rounded-lg
                       border border-gray-300
                       focus:ring-2 focus:ring-blue-500
                       focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-lg
                         border border-gray-300
                         focus:ring-2 focus:ring-blue-500
                         focus:outline-none"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white font-semibold
                     hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-5">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-3 text-sm text-gray-400">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3
                   py-2.5 rounded-lg border border-gray-300
                   bg-white hover:bg-gray-50 transition"
      >
        <FaGoogle className="text-red-500 text-lg" />
        <span className="font-medium text-gray-700">
          Continue with Google
        </span>
      </button>

      {/* Signup link */}
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-600">Don't have an account?</span>
        <Link
          to="/signup"
          className="ml-1 text-blue-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </div>

    </div>
  </div>
);

};

export default Login;
