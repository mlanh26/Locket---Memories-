import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleResetPassword = () => {
    if (!isValidEmail(email)) return;

    setIsSending(true);
    // Giả lập gửi email (thực tế sẽ gọi API)
    setTimeout(() => {
      setIsSending(false);
      Alert.alert(
        "Check your email",
        "We've sent password reset instructions to your email address.",
        [
          {
            text: "OK",
            onPress: () => router.back()
          }
        ]
      );
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subtitle}>Enter your email address and we'll send you instructions to reset your password.</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="done"
          editable={!isSending}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            isValidEmail(email) ? styles.buttonActive : styles.buttonInactive
          ]}
          onPress={handleResetPassword}
          disabled={!isValidEmail(email) || isSending}
        >
          <Text style={[
            styles.buttonText,
            isValidEmail(email) ? styles.buttonTextActive : styles.buttonTextInactive
          ]}>{isSending ? 'Sending...' : 'Send Reset Link →'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isSending}
        >
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonActive: {
    backgroundColor: '#FFB800',
  },
  buttonInactive: {
    backgroundColor: '#1C1C1E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: '#000000',
  },
  buttonTextInactive: {
    color: '#666',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFB800',
    fontSize: 16,
  }
});

export default ForgotPasswordScreen;
