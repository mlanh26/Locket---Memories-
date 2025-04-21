import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const EmailScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your email?</Text>
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder=""
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.footer}>
        <Text style={styles.termsText}>
          By tapping Continue, you are agreeing to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>

        <TouchableOpacity 
          style={[
            styles.button,
            isValidEmail(email) ? styles.buttonActive : styles.buttonInactive
          ]}
          onPress={() => router.push('/verify')}
          disabled={!isValidEmail(email)}
        >
          <Text style={[
            styles.buttonText,
            isValidEmail(email) ? styles.buttonTextActive : styles.buttonTextInactive
          ]}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  buttonActive: {
    backgroundColor: '#FFB800',
  },
  buttonInactive: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextActive: {
    color: '#000000',
  },
  buttonTextInactive: {
    color: '#FFFFFF',
  },
});

export default EmailScreen;
