import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          // Verify token with backend
          const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (response.data.success) {
            const userData = response.data.data;
            const updatedUser = {
              name: userData.fullName,
              email: userData.email,
              role: userData.role,
              phone: userData.phone || '',
              address: userData.address || ''
            };
            setUser(updatedUser);
            setToken(storedToken);
            setIsLoggedIn(true);
            // Update localStorage with fresh data
            localStorage.setItem('user', JSON.stringify(updatedUser));
          } else {
            // If token verification fails, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (data) => {
    try {
      console.log('AuthContext login:', data);
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone || '',
        address: data.address || ''
      };
      setUser(userData);
      setToken(data.token);
      setIsLoggedIn(true);
      
      // Store in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      console.error('AuthContext login error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const updateUser = (userData) => {
    const updatedUser = {
      ...user,
      ...userData,
      phone: userData.phone || user?.phone || '',
      address: userData.address || user?.address || ''
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    console.log('AuthContext logout');
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};