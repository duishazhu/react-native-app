import 'polyfill/i18n-polyfill';
import { App } from 'configs/app';
import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import { getCurrentLocale } from 'plugin/i18n';
import { request } from '@terminus/mall-utils';
import { getEnvAsync } from 'configs/env-register';
import { requestCommonConfig } from 'configs/request';

LogBox.ignoreAllLogs(true);

export function start() {
  getEnvAsync().then((envConfig) => {
    request.initRequestConfig({
      // 请求发出之前
      beforeSend: async (api, options) => {
        const language = await getCurrentLocale();
        return {
          url: /https?:\/\//.test(api) ? api : `${envConfig.url}${api}`,
          options: {
            ...options,
            headers: { ...options.headers, 'design-site-locale': language, 'Accept-Language': language },
          },
        };
      },
      ...requestCommonConfig,
    });
  });

  AppRegistry.registerComponent('TmallMobile', () => App);
}
