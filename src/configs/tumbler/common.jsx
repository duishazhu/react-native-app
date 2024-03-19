import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Tumbler } from '@terminus/mall-base';
import { envPlugin } from 'plugin/env-plugin';
import { getEnvAsync } from 'configs/env-register';
import { i18nPlugin } from 'plugin/i18n';
import { DEFAULT_LANGUAGE } from 'locale';

import themes from 'styles/default-themes';

const tumbler = new Tumbler();

export const commonDataItems = [
  {
    name: 'user',
    initialData: {},
    url: '/api/user/web/current-user',
    excludeRoute: ['Auth'],
    options: { quite: true },
    handleData(data) {
      return data || {};
    },
    onError() {
      return {};
    },
  },
  { name: 'storeInfo', initialData: null },
  { name: 'autoLocation', initialData: null },
  // 单选门店
  { name: 'selectedStore', initialData: null },
  // 多选门店
  { name: 'selectedStoreMultiple', initialData: null },
  // 选择商品
  { name: 'selectedProduct', initialData: null },
];

export function getCommonTumbler() {
  tumbler.reset();
  tumbler.plugin(i18nPlugin({ defaultLocale: DEFAULT_LANGUAGE, theme: themes }));
  tumbler.plugin(envPlugin(getEnvAsync));
  tumbler.plugin({ component: SafeAreaProvider });

  return tumbler;
}

export { tumbler };
