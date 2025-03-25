import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import { AxiosError } from 'axios';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@user_data';

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      username: string;
    };
  };
}

interface ErrorResponse {
  message: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    await AsyncStorage.setItem(TOKEN_KEY, response.data.data.token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Đăng nhập thất bại');
    }
    // Xử lý AxiosError
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || 'Đăng nhập thất bại'
    );
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi đăng xuất:', error.message);
    } else {
      console.error('Lỗi khi đăng xuất:', String(error));
    }
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy token:', error.message);
    } else {
      console.error('Lỗi khi lấy token:', String(error));
    }
    return null;
  }
};

export const getUser = async () => {
  try {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy thông tin user:', error.message);
    } else {
      console.error('Lỗi khi lấy thông tin user:', String(error));
    }
    return null;
  }
};
