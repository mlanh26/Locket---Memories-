import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../src/home/SplashScreen';
import WelcomeScreen from '../src/log_sign_in/WelcomeScreen';
import EmailScreen from '../src/log_sign_in/EmailScreen';
import LoginEmailScreen from '../src/log_sign_in/LoginEmailScreen';
import LoginPasswordScreen from '../src/log_sign_in/LoginPasswordScreen';
import NumberVerificationScreen from '../src/log_sign_in/NumberVerificationScreen';
import NameScreen from '../src/log_sign_in/NameScreen';
import AddFirstFriendsScreen from '../src/home/AddFirstFriendsScreen';
import Messages from '../app/messages';

export type RootStackParamList = {
  splash: undefined;
  welcome: undefined;
  email: undefined;
  loginEmail: undefined;
  loginPassword: undefined;
  numberVerification: undefined;
  name: undefined;
  addFriends: undefined;
  messages: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="email" component={EmailScreen} />
      <Stack.Screen name="loginEmail" component={LoginEmailScreen} />
      <Stack.Screen name="loginPassword" component={LoginPasswordScreen} />
      <Stack.Screen name="numberVerification" component={NumberVerificationScreen} />
      <Stack.Screen name="name" component={NameScreen} />
      <Stack.Screen name="addFriends" component={AddFirstFriendsScreen} />
      <Stack.Screen name="messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default AppNavigator;