// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure this matches the export

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth(); // Access authentication state from context

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  // Render the protected component if logged in
  return children;
};

export default ProtectedRoute;