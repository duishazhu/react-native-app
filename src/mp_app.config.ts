import { IAppConfig } from '@terminus/octopus-shared';

const config: IAppConfig = {
  debug: false,
  tabBar: {
    borderStyle: 'white',
    color: '#999999',
    selectedColor: '#333333',
  },
  window: {
    navigationStyle: 'custom',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FAFAFA',
    backgroundColorTop: '#FAFAFA',
    backgroundColorBottom: '#FAFAFA',
  },
  preloadRule: {
    'pages/home/index': {
      packages: ['package'],
      network: 'all',
    },
    'pages/apps/index': {
      packages: ['package'],
      network: 'all',
    },
    'pages/report/index': {
      packages: ['package'],
      network: 'all',
    },
    'pages/account/index': {
      packages: ['package'],
      network: 'all',
    },
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
  requiredPrivateInfos: ['chooseLocation', 'getLocation'],
};
export default config;
