import { isWeb } from 'utils/platform';
import { initCommonDataConfig, commonDataNativePlugin } from '@terminus/mall-base';
import { setSession, getSession } from '@terminus/mall-utils';
import { PortalPlugin } from 'plugin/portal';
import { tumbler, commonDataItems, getCommonTumbler } from 'configs/tumbler/common';

initCommonDataConfig({
  items: commonDataItems,
  cache: 'auto',
  cacheItem: isWeb
    ? async (key, value) => {
        const data = getSession('common-data-cache') || {};
        data[key] = value;
        setSession('common-data-cache', data, { maxAge: 86400 * 2 });
      }
    : null,
  getCacheItem: isWeb
    ? async (key) => {
        const data = getSession('common-data-cache') || {};
        return data[key];
      }
    : null,
});

export function getTumbler() {
  const tumblerInit = getCommonTumbler();

  tumblerInit.plugin(commonDataNativePlugin({}, true));
  tumblerInit.plugin({ component: PortalPlugin });

  return tumblerInit;
}

export { tumbler };
