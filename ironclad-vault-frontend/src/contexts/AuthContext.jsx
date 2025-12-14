import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        
        // Extract user info from token
        const userInfo = {
          username: decoded.sub || decoded.username,
          role: decoded.role || 'USER',
          email: decoded.email
        };
        setUser(userInfo);
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username, password });
      
      // IMPORTANT: Backend expects rawPassword field, not password
      const response = await authService.login(username, password);
      
      console.log('Login response:', response);
      
      if (response.data && response.data.token) {
        const token = response.data.token;
        setToken(token);
        
        // Decode token to get user info
        const decoded = jwtDecode(token);
        const userInfo = {
          username: decoded.sub || decoded.username,
          role: response.data.role || 'USER',
          email: decoded.email
        };
        setUser(userInfo);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          message: 'Invalid response from server' 
        };
      }
    } catch (error) {
      console.error('Login error:', error.response || error);
      return { 
        success: false, 
        message: error.response?.data || error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registering user:', userData);
      const response = await authService.register(userData);
      console.log('Register response:', response);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.response || error);
      return { 
        success: false, 
        message: error.response?.data?.message || error.response?.data || error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const isManager = () => {
    return user?.role === 'MANAGER' || user?.role === 'ADMIN';
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isAdmin,
      isManager,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};