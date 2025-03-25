import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các màn hình
import { CameraScreen } from './src/screens/home/CameraScreen';
import { UploadScreen } from './src/screens/home/UploadScreen';
import { FeedScreen } from './src/screens/home/FeedScreen';
import { ChatScreen } from './src/screens/messages/ChatScreen';
import { ChatListScreen } from './src/screens/messages/ChatListScreen';
import { ProfileScreen } from './src/screens/profile/ProfileScreen';

// Định nghĩa kiểu cho stack navigation
export type RootStackParamList = {
  Camera: undefined;
  Upload: {
    photo: {
      uri: string;
      base64?: string;
    }
  };
  Feed: undefined;
  ChatList: undefined;
  Chat: {
    userId: string;
    username: string;
  };
  Profile: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upload"
          component={UploadScreen}
          options={{ title: 'Đăng ảnh' }}
        />
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ title: 'Trang chủ' }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
          options={{ title: 'Tin nhắn' }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.username,
          })}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Trang cá nhân' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
