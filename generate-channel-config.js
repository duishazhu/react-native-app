/* eslint-disable @typescript-eslint/no-var-requires */
// should read env from .env file

const config = {
  push: {
    android: {
      appKey: '28647270',
      appSecret: '',
      channel: 'gaia-mobile',
    },
    ios: {
      appKey: '29303958',
      appSecret: '',
    },
  },
  amap: {
    android: {
      key: process.env.AMAP_KEY_ANDR || '',
    },
    ios: {
      key: process.env.AMAP_KEY_IOS || '',
      IDFA: false,
    },
  },
  wechat: {
    android: {
      key: 'wxf37ec75a85dd97a5',
      secret: '',
    },
    ios: {
      key: 'wxf37ec75a85dd97a5',
      secret: '',
      link: 'https://m-seldon2-bbc-test.app.terminus.io/',
    },
  },
  alipay: {
    ios: {
      key: '20180423025943211',
    },
  },
  qq: {
    android: {
      key: '1106536970',
      secret: '',
    },
    ios: {
      key: '1106536970',
      secret: '',
    },
  },
  sina: {
    android: {
      key: '1035054353',
      redirect: 'https://api.weibo.com/oauth2/default.html',
      secret: '',
    },
    ios: {
      key: '1035054353',
      link: 'https://m-seldon2-bbc-test.app.terminus.io/',
      secret: '',
      redirect: 'https://api.weibo.com/oauth2/default.html',
    },
  },
  phone: {
    android: {
      key: '',
    },
    ios: {
      key: '',
    },
  },
  umeng: {
    android: {
      channel: 'terminus',
      appkey: '',
    },
    ios: {
      channel: 'terminus',
      appkey: '',
    },
  },
  stripe: {
    android: {
      key: '',
    },
    ios: {
      key: '',
    },
  },
  google: {
    ios: {
      appId: '',
    },
    android: {
      appId: '',
    },
  },
  // 子渠道代码相关
  packages: [
    {
      '@terminus/react-native-amap-sdk': {
        android: ['platforms/locationamap', 'platforms/map2damap'],
        ios: ['LocationAmap', 'Map2dAmap'],
      },
    },
    {
      '@terminus/react-native-push': {
        android: ['android/alicloudpush'],
        ios: ['AliCloudPush'],
      },
    },
    {
      '@terminus/react-native-payments': {
        android: ['platforms/wechat', 'platforms/alipay', 'platforms/stripe'],
        ios: ['wechat', 'alipay', 'stripe'],
      },
    },
    process.env.ENABLE_DEBUG && {
      '@terminus/rn-presets': {
        android: ['extra/debug-android'],
        ios: ['debug'],
      },
    },
    {
      '@terminus/react-native-social': [
        'platforms/qq', // # sub dependency
        'platforms/wechat',
        'platforms/phone',
      ],
    }, // # root dependency
    {
      '@terminus/analytics': {
        android: ['platform/umeng'],
        ios: ['umeng'],
      },
    },
  ]
    .filter(Boolean)
    .reduce((acc, cv) => Object.assign(acc, cv), {}),
  // iOS隐私文案
  privicys: {
    NSPhotoLibraryUsageDescription: '我们将使用您的相册上传个人照片或识别相册图片提供更便捷的查询服务',
    NSCameraUsageDescription: '我们将使用您的相机扫描二维码，条形码，以及视频通讯的的服务',
    NSMicrophoneUsageDescription: '我们将使用麦克风方便和客服描述问题',
    NSLocationUsageDescription: '我们将使用您的位置信息以提供更好的服务',
    NSLocationAlwaysAndWhenInUseUsageDescription: '我们将使用您的位置信息以提供更好的服务',
    NSLocationWhenInUseUsageDescription: '我们将使用您的位置信息以提供更好的服务',
  },
};

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'channel.yml');

function output() {
  const content = yaml.dump(config, {
    lineWidth: -1,
    forceQuotes: true,
  });
  const tip = `#这个文件是通过脚本生成的，请不要手动修改！`;
  fs.writeFileSync(filePath, `${tip}\n${content}`);
  console.log('FRESH CHANNEL CONFIG:\n');
  console.log(content);
  console.log('###----END OF CONFIG ----');
}

// let fileExists = false;
// try {
//   fs.accessSync(filePath, fs.constants.F_OK);
//   fileExists = true;
// } catch (e) {
//   fileExists = false;
// }
// // 强行指定重新生成channel.yml 或者 当文件不存在的时候
output();
