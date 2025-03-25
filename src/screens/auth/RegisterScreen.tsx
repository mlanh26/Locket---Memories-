import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@components/Button';
import { COLORS, SPACING, FONTS } from '@constants/index';
import { api } from '@services/api';
import { validate} from 'src/utils/validate.ts';

export const RegisterScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!validate.isValidEmail(formData.email)) {  // Sửa lại cách gọi hàm
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    if (!validate.isValidPassword(formData.password)) {  // Sửa lại cách gọi hàm
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      setLoading(true);
      await api.post('/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      Alert.alert('Thành công', 'Đăng ký thành công', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: any) {  // Thêm type annotation
      Alert.alert(
        'Lỗi',
        error?.response?.data?.message || 'Đăng ký thất bại'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
      />

      <Button
        title="Đăng ký"
        onPress={handleRegister}
        loading={loading}
      />

      <Button
        title="Đã có tài khoản? Đăng nhập"
        onPress={() => navigation.navigate('Login')}
        variant="secondary"
        style={styles.loginButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontFamily: FONTS.families.primary.bold, // Sửa lại theo cấu trúc FONTS mới
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.xs,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONTS.sizes.md,
  },
  loginButton: {
    marginTop: SPACING.md,
  },
});

