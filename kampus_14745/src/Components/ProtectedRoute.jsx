import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children ? children : <Outlet />;
  }

  return <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
