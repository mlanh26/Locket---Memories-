import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleAuthService } from '../services/googleAuthService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Khởi tạo Google Sign-In khi component được tạo
  useEffect(() => {
    googleAuthService.init();
  }, []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });
      setToken(response.token);
      setUser(response.user);
      await AsyncStorage.setItem('token', response.token);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during login');
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const googleResponse = await googleAuthService.signIn();
      setToken(googleResponse.token);
      setUser(googleResponse.user);
      await AsyncStorage.setItem('token', googleResponse.token);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during Google login');
      throw error;
    }
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      setError(null);
      const response = await authAPI.register(data);
      setToken(response.token);
      setUser(response.user);
      await AsyncStorage.setItem('token', response.token);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during registration');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('token');
      // Đăng xuất khỏi Google nếu đã đăng nhập bằng Google
      const isGoogleSignedIn = await googleAuthService.isSignedIn();
      if (isGoogleSignedIn) {
        await googleAuthService.signOut();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        token,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
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
