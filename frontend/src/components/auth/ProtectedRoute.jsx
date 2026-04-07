// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { userRole, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If not logged in, redirect to signin
  if (!userRole) {
    return <Navigate to="/signin" replace />;
  }

  // Role-based redirect mapping
  const roleRedirects = {
    student: '/dashboard',
    teacher: '/teacher',
    parent: '/parent/dashboard',
    admin: '/admin/dashboard'
  };

  // If user role is not allowed, redirect to appropriate dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const redirectPath = roleRedirects[userRole] || '/signin';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;