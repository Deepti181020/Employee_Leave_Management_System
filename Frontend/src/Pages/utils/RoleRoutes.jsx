import React from 'react';
import { useAuth } from '../../Context/authContext';
import { Navigate } from 'react-router-dom';

const RoleRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to={user ? "/unauthorized" : "/login-page"} />;
  }

  return children;
};

export default RoleRoutes;
