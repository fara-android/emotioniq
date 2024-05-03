import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.emotioniq.app',
  appName: 'emotioniq',
  webDir: 'www',
  "plugins": {
    "Storage": {
      "sync": true
    }
  }
};

export default config;
