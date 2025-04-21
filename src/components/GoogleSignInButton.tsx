import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

interface GoogleSignInButtonProps {
  onPress?: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onPress }) => {
  const { loginWithGoogle, error } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Nếu đăng nhập thành công, chuyển hướng đến màn hình tin nhắn hoặc trang chính
      router.push('/messages');
    } catch (error) {
      console.error('Đăng nhập Google thất bại:', error);
      // Lỗi đã được xử lý trong context
    }

    // Gọi onPress từ props nếu được cung cấp
    if (onPress) {
      onPress();
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Image 
          source={require('../../assets/google-icon.png')} 
          style={styles.icon} 
          // Sử dụng ảnh tên google-icon.png, bạn cần thêm vào thư mục assets
          // Hoặc thay thế bằng một ảnh khác nếu cần
        />
        <Text style={styles.text}>Đăng nhập bằng Google</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    color: '#5F6368',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  }
});

export default GoogleSignInButton;
