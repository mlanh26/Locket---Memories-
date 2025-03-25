import { VALIDATION } from '../constants';

export const validate = {
  // Kiểm tra email
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Kiểm tra độ dài mật khẩu
  isValidPassword: (password: string): boolean => {
    return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
  },

  // Kiểm tra tên người dùng
  isValidUsername: (username: string): boolean => {
    return (
      username.length >= VALIDATION.USERNAME_MIN_LENGTH &&
      username.length <= VALIDATION.USERNAME_MAX_LENGTH
    );
  },

  // Kiểm tra URL
  isValidURL: (url: string): boolean => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    return urlPattern.test(url);
  },

  // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
  isEmptyString: (str: string): boolean => {
    return !str || str.trim().length === 0;
  },

  // Kiểm tra độ dài tối đa của văn bản
  isValidLength: (text: string, maxLength: number): boolean => {
    return text.length <= maxLength;
  },

  // Kiểm tra định dạng ngày tháng
  isValidDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  },

  // Kiểm tra file ảnh
  isValidImageFile: (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  },

  // Kiểm tra kích thước file
  isValidFileSize: (file: File, maxSize: number): boolean => {
    return file.size <= maxSize;
  },

  // Kiểm tra mật khẩu mạnh
  isStrongPassword: (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  },

  // Tạo thông báo lỗi cho form
  getErrorMessage: (field: string, value: string): string | null => {
    switch (field) {
      case 'email':
        if (!value) {
          return 'Email là bắt buộc';
        }
        if (!validate.isValidEmail(value)){
          return 'Email không hợp lệ';
        }
        return null;
      case 'password':
        if (!value) {
          return 'Mật khẩu là bắt buộc';
        }
        if (!validate.isValidPassword(value)) {
          return 'Mật khẩu phải có ít nhất ${VALIDATION.PASSWORD_MIN_LENGTH} ký tự';
        }
        return null;

      case 'username':
        if (!value) {
          return 'Tên người dùng là bắt buộc';
        }
        if (!validate.isValidUsername(value)) {
          return 'Tên người dùng phải có từ ${VALIDATION.USERNAME_MIN_LENGTH} đến ${VALIDATION.USERNAME_MAX_LENGTH} ký tự';
        }
        return null;

      default:
        return null;
    }
  },

  // Kiểm tra form đăng ký
  validateRegisterForm: (formData: {
    email: string;
    password: string;
    username: string;
  }) => {
    const errors: Record<string, string> = {};

    if (!validate.isValidEmail(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!validate.isStrongPassword(formData.password)) {
      errors.password = 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
    }

    if (!validate.isValidUsername(formData.username)) {
      errors.username = `Tên người dùng phải có từ ${VALIDATION.USERNAME_MIN_LENGTH} đến ${VALIDATION.USERNAME_MAX_LENGTH} ký tự`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default validate;
