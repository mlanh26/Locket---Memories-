import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const CreatePasswordScreen = () => {
  const router = useRouter();
  const [creatPassword, setCreatPassword] = useState('');
  const [enterAgain, setEnterAgain] = useState('');

  const isValidName = () => {
    return creatPassword.trim().length > 0 && enterAgain.trim().length > 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's your password?</Text>
      
      <TextInput
        style={styles.input}
        value={creatPassword}
        onChangeText={setCreatPassword}
        placeholder="Create password"
        placeholderTextColor="#666"
        autoCapitalize="words"
      />

      <TextInput
        style={[styles.input, styles.secondInput]}
        value={enterAgain}
        onChangeText={setEnterAgain}
        placeholder="Confirm password"
        placeholderTextColor="#666"
        autoCapitalize="words"
      />

      <TouchableOpacity 
        style={[
          styles.button,
          isValidName() ? styles.buttonActive : styles.buttonInactive
        ]}
        onPress={() => router.push('/friends')}
        disabled={!isValidName()}
      >
        <Text style={[
          styles.buttonText,
          isValidName() ? styles.buttonTextActive : styles.buttonTextInactive
        ]}>Continue →</Text>
      </TouchableOpacity>
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
  secondInput: {
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
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

export default CreatePasswordScreen;