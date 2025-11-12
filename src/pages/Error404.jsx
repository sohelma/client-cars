import React from "react";
import { Link } from "react-router";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      
      {/* 404 Text */}
      <h1 className="text-8xl font-extrabold text-blue-600 dark:text-blue-400">404</h1>
      <p className="mt-4 text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-semibold">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md"
      >
        Back to Home
      </Link>

      {/* Optional SVG Illustration */}
      <div className="mt-10 w-full max-w-md">
        <svg viewBox="0 0 800 600" className="w-full h-64">
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" rx="24" fill="url(#g1)" opacity="0.06" />
          <circle cx="200" cy="200" r="50" fill="#3B82F6" opacity="0.1" />
          <circle cx="600" cy="400" r="70" fill="#2563EB" opacity="0.1" />
        </svg>
      </div>
    </div>
  );
};

export default Error404;
