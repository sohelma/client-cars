import { Navigate, useLocation } from "react-router-dom"; 
import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
