// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  // ধরুন localStorage থেকে user info fetch করছি
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
