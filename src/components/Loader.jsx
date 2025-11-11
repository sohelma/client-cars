// src/components/Loader.jsx
import React from "react";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-10 h-10 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default Loader;
