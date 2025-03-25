import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from '../screens/Home/FeedScreen';
import { CameraScreen } from '../screens/Home/CameraScreen';
import { ChatListScreen } from '../screens/Messages/ChatListScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: 'Trang chủ' }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{ title: 'Camera' }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatListScreen}
        options={{ title: 'Tin nhắn' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Cá nhân' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
