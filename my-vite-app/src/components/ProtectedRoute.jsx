import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // Fixed import
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth(); // Avoid destructuring directly
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Debug log to confirm context
  console.log("ProtectedRoute: auth =", auth);

  // Fallback if auth is undefined
  if (!auth) {
    console.error("Auth context is undefined");
    return <Navigate to="/login" replace />;
  }

  const { isLoggedIn, setIsLoggedIn, setUser } = auth;

  useEffect(() => {
    const verifyToken = async () => {
      if (!isLoggedIn && token) {
        try {
          const response = await axios.get("http://localhost:5000/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success) {
            setIsLoggedIn(true);
            setUser(response.data.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token verification failed:", error.message);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [isLoggedIn, token, setIsLoggedIn, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("ProtectedRoute: isLoggedIn =", isLoggedIn, "token =", !!token);

  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;