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
import { useAuth } from '../contexts/AuthContext';

const LoginEmailScreen = () => {
  const router = useRouter();
  const { error } = useAuth();
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {
    if (isValidEmail(email)) {
      router.push({
        pathname: '/loginPassword',
        params: { email }
      });
    } else {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>What's your login email?</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          blurOnSubmit={true}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            isValidEmail(email) ? styles.buttonActive : styles.buttonInactive
          ]}
          onPress={handleContinue}
          disabled={!isValidEmail(email)}
        >
          <Text style={styles.buttonText}>Continue →</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#000000',
  },
  button: {
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#FFB800',
  },
  buttonInactive: {
    backgroundColor: '#1A1A1A',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
  }
});

export default LoginEmailScreen;
