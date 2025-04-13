// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};