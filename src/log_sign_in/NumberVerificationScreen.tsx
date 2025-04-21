import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const NumberVerificationScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const isValidCode = () => {
    return code.length === 6;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email</Text>
      
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="6-Digit Code"
        placeholderTextColor="#666"
        keyboardType="number-pad"
        maxLength={6}
        blurOnSubmit={true}
        returnKeyType="done"
        onSubmitEditing={() => {
          if (isValidCode()) {
            // Chuyển sang bước tiếp theo
            router.push('/name');
          }
        }}
      />

      <Text style={styles.helperText}>
        You should have just received{'\n'}
        a text with your code
      </Text>

      <TouchableOpacity 
        style={[
          styles.button,
          isValidCode() ? styles.buttonActive : styles.buttonInactive
        ]}
        onPress={() => router.push('/name')}
        disabled={!isValidCode()}
      >
        <Text style={[
          styles.buttonText,
          isValidCode() ? styles.buttonTextActive : styles.buttonTextInactive
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
  helperText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
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

export default NumberVerificationScreen;