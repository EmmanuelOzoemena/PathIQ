// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

// Create context
const AuthContext = createContext(null);

// Custom hook - make sure this is properly defined
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadFromStorage = () => {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('userRole');
      const storedUser = localStorage.getItem('user_data');

      if (storedToken && storedRole && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserRole(storedRole);
          setToken(storedToken);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('user_data');
        }
      }
      setLoading(false);
    };

    loadFromStorage();
  }, []);

  const login = (userData, role, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('userRole', role);
    localStorage.setItem('user_data', JSON.stringify(userData));
    
    setUser(userData);
    setUserRole(role);
    setToken(authToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user_data');
    
    setUser(null);
    setUserRole(null);
    setToken(null);
  };

  const value = {
    user,
    userRole,
    loading,
    login,
    logout,
    token,
    isAuthenticated: !!token && !!userRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Only one default export
export default AuthProvider;