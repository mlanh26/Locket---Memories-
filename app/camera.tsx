import { View } from 'react-native';
import CameraScreen from '../src/camera/CameraScreen';

export default function Camera() {
  return (
    <View style={{ flex: 1 }}>
      <CameraScreen />
    </View>
  );
}