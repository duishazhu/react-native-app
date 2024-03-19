import { jumpTo } from 'common/helper';
import { NativeModules, DeviceEventEmitter } from 'react-native';
import { getEnvAsync } from 'configs/env-register';
import { NavigationService } from '@terminus/react-navigation';
import { PushEventEmitter, PushEventManager } from '@terminus/react-native-push';

export const ADVERTISEMENT_EVENT_KEY = '_SKIP_ADVERTISEMENT_EVENT';

async function navigate(event) {
  const { host } = await getEnvAsync();
  // 若消息有extra 则 redirect会编程string型的obj  若消息无extra则直接得到{}
  let { redirect } = event;
  redirect = typeof redirect === 'object' ? redirect : JSON.parse(redirect);
  if (redirect && Object.keys(redirect).length !== 0) {
    const { url } = redirect;
    if (url) {
      // 跳转webview
      setTimeout(() => jumpTo({ path: url, host }), 200);
    }
  } else {
    // 跳转消息中心
    setTimeout(() => NavigationService.navigate('MessageCenter'), 200);
  }
}

export default async () => {
  try {
    await NativeModules?.ChannelManager?.lazyInit();
  } catch (e) {
    console.error(e);
  }

  PushEventManager.initPush();

  PushEventEmitter.notification(async (event) => {
    if (!event) {
      return;
    }
    const { name } = NavigationService.getCurrentNav() || {};
    if (name === 'Advertisement') {
      const subscription = DeviceEventEmitter.addListener(ADVERTISEMENT_EVENT_KEY, () => {
        navigate(event);
        subscription.remove();
      });
    } else navigate(event);
  });
};
