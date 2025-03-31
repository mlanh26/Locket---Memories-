import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreenComponent from '../src/SplashScreen';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Giả lập thời gian loading
    const timer = setTimeout(() => {
      router.replace('/welcome');  // Thêm dấu / vào trước welcome
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SplashScreenComponent />
    </View>
  );
}