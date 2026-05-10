import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();
  console.log('ProtectedRoute: isLoggedIn=', isLoggedIn, 'user=', user, 'requiredRole=', requiredRole);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If a role is required, check if the user has that role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to the appropriate dashboard based on user's role
    return <Navigate to={user?.role === 'agent' ? '/agent-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;