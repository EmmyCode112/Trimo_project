// src/components/PublicOnlyRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // If the user is authenticated, redirect them away from public-only pages
    return <Navigate to="/dashboard/overview" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
