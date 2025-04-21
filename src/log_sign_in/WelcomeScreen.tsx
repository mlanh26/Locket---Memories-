import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/locket-icon.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Locket</Text>
        </View>
        <Text style={styles.description}>Live pics from your friends,{'\n'}on your home screen</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.replace('/email')}
        >
          <Text style={styles.signInText}>Sign in →</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logInButton}
          onPress={() => router.replace('/loginEmail')}
        >
          <Text style={styles.logInText}>Log in →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: '30%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 12,
  },
  signInButton: {
    backgroundColor: '#FFB800',
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  logInButton: {
    backgroundColor: 'transparent',
    height: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
