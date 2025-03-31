import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@/src/SplashScreen';
import WelcomeScreen from '@/src/WelcomeScreen';
import EmailScreen from '@/src/EmailScreen';
import NumberVerificationScreen from '@/src/NumberVerificationScreen';
import NameScreen from '@/src/NameScreen';
import AddFirstFriendsScreen from '@/src/AddFirstFriendsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Email: undefined;
  NumberVerification: undefined;
  Name: undefined;
  AddFriends: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="NumberVerification" component={NumberVerificationScreen} />
      <Stack.Screen name="Name" component={NameScreen} />
      <Stack.Screen name="AddFriends" component={AddFirstFriendsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;