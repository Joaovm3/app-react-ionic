import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'app-react-ionic',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
