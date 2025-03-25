import { AppRegistry } from 'react-native';
import LocketClone from './src/screens/LocketClone'; // Đường dẫn đến file
//import EmailScreen from './src/screens/EmailScreen';
import { name as appName } from './app.json';

// Đăng ký component chính của ứng dụng
AppRegistry.registerComponent(appName, () => LocketClone);

