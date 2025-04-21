import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../src/contexts/AuthContext';

export default function Layout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="email" options={{ headerShown: false }} />
          <Stack.Screen name="loginEmail" options={{ headerShown: false }} />
          <Stack.Screen name="loginPassword" options={{ headerShown: false }} />
          <Stack.Screen name="number-verification" options={{ headerShown: false }} />
          <Stack.Screen name="name" options={{ headerShown: false }} />
          <Stack.Screen name="add-first-friends" options={{ headerShown: false }} />
          <Stack.Screen name="camera" options={{ headerShown: false }} />
          <Stack.Screen name="messages" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </AuthProvider>
  );
}