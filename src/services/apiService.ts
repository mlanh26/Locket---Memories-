import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.0.103:3000/api';

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor để xử lý token
apiService.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const response = await apiService.post('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await apiService.post('/auth/login', data);
    return response.data;
  },

  loginWithGoogle: async (data: { token: string | null }) => {
    const response = await apiService.post('/auth/google', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiService.get('/auth/me');
    return response.data;
  },
};

export default apiService;
