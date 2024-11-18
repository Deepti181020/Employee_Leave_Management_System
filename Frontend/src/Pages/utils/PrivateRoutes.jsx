import React from 'react';
import { useAuth } from '../../Context/authContext';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login-page" />;
};

export default PrivateRoutes;
