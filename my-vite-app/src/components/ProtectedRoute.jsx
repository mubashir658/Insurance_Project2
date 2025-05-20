import React from 'react';
   import { Navigate } from 'react-router-dom';
   import { useAuth } from '../context/AuthContext.jsx';

   const ProtectedRoute = ({ children }) => {
     const { isLoggedIn, token } = useAuth();
     console.log('ProtectedRoute: isLoggedIn=', isLoggedIn, 'token=', token);
     return isLoggedIn && token ? children : <Navigate to="/login" />;
   };

   export default ProtectedRoute;