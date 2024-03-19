import 'intersection-observer';
import { AppRegistry } from 'react-native';
import { App } from 'configs/app';
import { request } from '@terminus/mall-utils';
import { getEnvAsync } from 'configs/env-register';
import { requestCommonConfig } from 'configs/request';
import { supportPathRouter } from 'configs/navigators';
import { getCurrentLocale } from 'plugin/i18n';
import { injectDefaultWechatShare } from 'common/wechat-share';
import 'styles/app.scss';

window.__DEV__ = true;

export function start() {
  supportPathRouter(window.location.hostname);
  injectDefaultWechatShare();
  getEnvAsync().then(() => {
    request.initRequestConfig({
      ...requestCommonConfig,

      beforeSend: async (url, options) => {
        const language = await getCurrentLocale();
        return {
          url,
          options: {
            ...options,
            headers: { ...options.headers, 'design-site-locale': language, 'Accept-Language': language },
          },
        };
      },
    });
  });
  // render(<App />, document.getElementById('container'));
  AppRegistry.registerComponent('TmallMobile', () => App);
  AppRegistry.runApplication('TmallMobile', {
    rootTag: document.getElementById('container'),
  });
}
