import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AuthContextType, User, RegisterData } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const API_URL = 'http://localhost:4000/api/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  // Load stored user + token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // ✅ Register new user
  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/register`, data);
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message ?? 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Verify email with email + code
  const verifyEmail = async (email: string, code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/verify-email`, { email, code });
      return true;
    } catch (err: any) {
      throw new Error(err.response?.data?.message ?? 'Email verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Resend verification code
  const resendVerificationCode = async (email: string): Promise<string> => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/resend-verification-code`, { email });
      return res.data.message;
    } catch (err: any) {
      throw new Error(err.response?.data?.message ?? 'Resend verification code failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Login (with optional role)
  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password, role });

      // Save user & token
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);

      return true;
    } catch (err: any) {
      console.error('Login error:', err.response?.data?.message ?? err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Logout → send to Landing Page instead of Login
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];

    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        verifyEmail,
        resendVerificationCode,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
