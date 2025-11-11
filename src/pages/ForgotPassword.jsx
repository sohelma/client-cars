// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: "Password reset email has been sent. Check your inbox.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your registered email"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Email
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
