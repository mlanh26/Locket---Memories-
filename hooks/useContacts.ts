import { useState } from 'react';
import * as Contacts from 'expo-contacts';
import { Alert } from 'react-native';

export const useContacts = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getContacts = async () => {
    setIsLoading(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        
        const emailContacts = data
          .filter(contact => contact.emails && contact.emails.length > 0)
          .map(contact => ({
            name: contact.name,
            email: contact.emails![0].email
          }));
          
        return emailContacts;
      }
    } catch (error) {
      Alert.alert('Error', 'Could not access contacts');
    } finally {
      setIsLoading(false);
    }
  };

  return { getContacts, isLoading };
};