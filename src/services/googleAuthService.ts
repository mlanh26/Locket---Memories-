import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { authAPI } from './apiService';

// Cu1ea7n thu00eam phu01b0u01a1ng thu1ee9c nu00e0y vu00e0o apiService
declare module './apiService' {
  export interface AuthAPI {
    loginWithGoogle: (data: { token: string | null }) => Promise<{ token: string; user: any }>;
  }
}

// Đây là ID client dành cho web - bạn cần thay thế bằng ID từ Google Cloud Console
const WEB_CLIENT_ID = 'YOUR_GOOGLE_WEB_CLIENT_ID';

export const googleAuthService = {
  init: () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });
  },

  signIn: async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      // Phải nhận tokens riêng bằng getTokens() vì signIn() không trả về idToken
      const { idToken } = await GoogleSignin.getTokens();
      
      // Gửi idToken đến backend để xác thực và nhận JWT token
      const response = await authAPI.loginWithGoogle({
        token: idToken,
      });
      
      return response;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    } catch (error) {
      console.error('Google Get Current User Error:', error);
      return null;
    }
  },

  isSignedIn: async () => {
    try {
      // Kiu1ec3m tra xem cu00f3 ngu01b0u1eddi du00f9ng hiu1ec7n tu1ea1i hay khu00f4ng, nu1ebfu cu00f3 thu00ec u0111u00e3 u0111u0103ng nhu1eadp
      const currentUser = await GoogleSignin.getCurrentUser();
      return !!currentUser;
    } catch (error) {
      console.error('Google Is Signed In Error:', error);
      return false;
    }
  },
};
