import React, { createContext, useContext, useState } from "react";

   export const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [user, setUser] = useState(null);
     const [token, setToken] = useState(null);

     const login = async (data) => {
       try {
         console.log('AuthContext login:', data);
         setUser({ name: data.name, email: data.email, role: data.role });
         setToken(data.token);
         setIsLoggedIn(true);
         return { success: true };
       } catch (error) {
         console.error('AuthContext login error:', error.message);
         return { success: false, error: error.message };
       }
     };

     const logout = () => {
       console.log('AuthContext logout');
       setUser(null);
       setToken(null);
       setIsLoggedIn(false);
       localStorage.removeItem('token');
       localStorage.removeItem('customer');
     };

     return (
       <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
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