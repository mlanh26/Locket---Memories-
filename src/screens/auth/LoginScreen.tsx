import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Button } from '@components/Button';
import { COLORS, SPACING, FONTS } from 'src/constants/index.ts';
import { useAuth } from 'src/hooks/useAuth.tsx';
import { validate } from 'src/utils/validate.ts';

type RootStackParamList = {
  Register: undefined;
  // Thêm các screen khác nếu cần
};

interface LoginScreenProps {
  navigation: NavigationProp<RootStackParamList>;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!validate.isValidEmail(email) || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu hợp lệ');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      Alert.alert('Lỗi', error?.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        loading={loading}
      />

      <Button
        title="Đăng ký"
        onPress={() => navigation.navigate('Register')}
        variant="secondary"
        style={styles.registerButton}
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
    marginBottom: SPACING.xl,
    textAlign: 'center',
    fontSize: FONTS.sizes.lg,
    fontFamily: FONTS.families.primary.medium,
    fontWeight: '600', // chuẩn theo TextStyle
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.xs,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontFamily: FONTS.families.primary.regular,
    fontSize: FONTS.sizes.md,
  },
  registerButton: {
    marginTop: SPACING.lg,
  },
});

export default LoginScreen;
