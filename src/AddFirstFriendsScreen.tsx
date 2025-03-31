import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';

type RouterType = {
  push: (route: string) => void;
};

const AddFirstFriendsScreen = () => {
  const router = useRouter() as RouterType;
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleEnableContacts = () => {
    setIsEnabled(true);
  };

  const handleContinue = () => {
    if (isEnabled) {
      router.push('/camera');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add your friends</Text>
        <Text style={styles.subtitle}>You can add up to 5 people</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your contacts"
          placeholderTextColor="#666"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.importSection}>
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/icon_1.png')}
            style={styles.contactsIcon}
          />
        </View>
        <Text style={styles.importTitle}>Import your contacts</Text>
        <Text style={styles.importDescription}>
          Locket never saves your contacts{'\n'}
          or texts friends on your behalf
        </Text>
        <TouchableOpacity 
          style={[
            styles.enableButton,
            isEnabled ? styles.buttonActive : styles.buttonInactive
          ]}
          onPress={handleEnableContacts}
          disabled={isEnabled}
        >
          <Text style={[
            styles.enableButtonText,
            isEnabled ? styles.buttonTextActive : styles.buttonTextInactive
          ]}>
            {isEnabled ? 'Contacts Enabled' : 'Enable contacts'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          isEnabled ? styles.continueButtonActive : styles.continueButtonInactive
        ]}
        onPress={handleContinue}
        disabled={!isEnabled}
      >
        <Text style={[
          styles.continueButtonText,
          isEnabled ? styles.continueButtonTextActive : styles.continueButtonTextInactive
        ]}>
          Tiếp tục
        </Text>
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
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    width: '100%',
  },
  importSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactsIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
  importTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  importDescription: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  enableButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  continueButton: {
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
  enableButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  continueButtonText: {
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
  continueButtonActive: {
    backgroundColor: '#FFB800',
  },
  continueButtonInactive: {
    backgroundColor: '#333',
  },
  continueButtonTextActive: {
    color: '#000000',
  },
  continueButtonTextInactive: {
    color: '#FFFFFF',
  },
});

export default AddFirstFriendsScreen;