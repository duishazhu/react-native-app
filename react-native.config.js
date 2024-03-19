/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@terminus/react-native-channel-manager/validator').validate();

module.exports = {
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
    '@react-native-async-storage/async-storage': { platforms: {} },
    '@terminus/react-native-code-scanner': { platforms: {} },
    '@terminus/react-native-image-picker': { platforms: {} },
    'react-native-barcode-builder': { platforms: {} },
    'react-native-camera': { platforms: { android: null } },
    'react-native-fast-image': { platforms: {} },
    'react-native-linear-gradient': { platforms: {} },
    'react-native-svg': { platforms: {} },
    'react-native-webview': { platforms: {} },
    '@react-native-community/netinfo': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
