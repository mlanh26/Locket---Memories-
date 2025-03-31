import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from 'expo-router';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index"
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="email" options={{ headerShown: false }} />
        <Stack.Screen name="number-verification" options={{ headerShown: false }} />
        <Stack.Screen name="name" options={{ headerShown: false }} />
        <Stack.Screen name="add-first-friends" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
} 