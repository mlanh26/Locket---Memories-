// Import các constants từ các file khác
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { FONTS, typography } from './fonts';

// Export tất cả constants
export { COLORS, SPACING, FONTS, typography };

// Định nghĩa các constants chung
export const SCREEN_WIDTH = '100%';
export const SCREEN_HEIGHT = '100%';

// API Constants
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/user/profile',
  POSTS: '/posts',
  MESSAGES: '/messages',
};

// Navigation Routes
export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
  },
  MAIN: {
    HOME: 'Home',
    CAMERA: 'Camera',
    MESSAGES: 'Messages',
    PROFILE: 'Profile',
  },
};

// App Constants
export const APP_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  MAX_MESSAGE_LENGTH: 500,
  MAX_CAPTION_LENGTH: 2200,
  DEFAULT_PAGE_SIZE: 10,
};

// Validation Constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  BIO_MAX_LENGTH: 150,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng thử lại sau.',
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không chính xác.',
  REQUIRED_FIELD: 'Trường này là bắt buộc.',
  INVALID_EMAIL: 'Email không hợp lệ.',
  PASSWORD_TOO_SHORT: `Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự.`,
  USERNAME_LENGTH: `Tên người dùng phải có từ ${VALIDATION.USERNAME_MIN_LENGTH} đến ${VALIDATION.USERNAME_MAX_LENGTH} ký tự.`,
};

// Animation Constants
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
};

// DateTime Formats
export const DATE_TIME_FORMATS = {
  DEFAULT: 'DD/MM/YYYY',
  WITH_TIME: 'DD/MM/YYYY HH:mm',
  TIME_ONLY: 'HH:mm',
  MONTH_YEAR: 'MM/YYYY',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  APP_SETTINGS: '@app_settings',
  THEME: '@app_theme',
};

// Default Values - Sửa lại đường dẫn
export const DEFAULTS = {
  AVATAR: require('../../../assets/images/default-avatar.png'),
  COVER_IMAGE: require('../../../assets/images/default-cover.png'),
  PLACEHOLDER_IMAGE: require('../../../assets/images/placeholder.png'),
};
