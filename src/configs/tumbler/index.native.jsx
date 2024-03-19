import { Platform } from 'react-native';
import AppUpdate from 'entrance/app-update';
import { PortalPlugin } from 'plugin/portal';
import { initCommonDataConfig, commonDataNativePlugin } from '@terminus/mall-base';
import { commonDataItems, tumbler, getCommonTumbler } from 'configs/tumbler/common';
import { getAppVersionName } from '@terminus/react-native-appinfo';

initCommonDataConfig({
  items: [
    ...commonDataItems,
    {
      name: 'appUpdate',
      url: '/api/basic/mobile-app/version',
      includeRoute: ['Home'],
      options: {
        data: {
          type: Platform.OS.toLocaleUpperCase(),
          num: getAppVersionName(),
          // XXX: 项目中可使用 @terminus/react-native-appinfo 的 getDefaultChannelCode 函数获取不同渠道的code，拼接成name
          name: 'parana',
        },
        quiet: true,
      },
      handleData(data) {
        return data || {};
      },
      // 防止重复调用
      onError() {
        return {};
      },
    },
  ],
});

export function getTumbler() {
  const tumblerInit = getCommonTumbler();

  tumblerInit.plugin(() => commonDataNativePlugin({}, true), true);
  tumblerInit.plugin(() => ({ component: AppUpdate }), true);
  tumblerInit.plugin({ component: PortalPlugin });

  return tumblerInit;
}

export { tumbler };
