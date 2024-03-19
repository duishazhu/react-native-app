import appInit from 'utils/app-init';
import Privacy from 'entrance/privacy';
import { getTumbler } from 'configs/tumbler';
import { forceShowGuide } from 'common/constants';
import { getEnvAsync } from 'configs/env-register';
import { getStateFromPath } from 'utils/start-init';
import { AsyncStorage } from '@terminus/nusi-mobile';
import RNBootSplash from 'react-native-bootsplash';
import SessionManage from 'utils/track-session-store';
import { isIOS, isIosWeb, isWeb } from 'utils/platform';
import getInitialRouteName from 'utils/start-route-name';
import { injectDefaultWechatShare } from 'common/wechat-share';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { NavigationContainer, NavigationService } from '@terminus/react-navigation';
import { Navigator, supportPathRouter, linkConfig } from 'configs/navigators';

export function App() {
  // eslint-disable-next-line
  const [_, setReady] = useState(false);
  const [agree, setAgree] = useState(false);
  const rootElement = useRef(null);
  const tumbler = useRef(null);

  const forceUpdate = useCallback(() => setReady({}), []);

  useEffect(() => {
    if (!tumbler.current) {
      SessionManage.updateSessionId();
      tumbler.current = getTumbler();
    }
  }, []);

  const getNavigationApp = useCallback(async (initialRouteName) => {
    await AsyncStorage.remove('previousRouteName');
    const { host, prefixes } = await getEnvAsync();

    tumbler.current.useApp(
      <NavigationContainer
        documentTitle={{ enabled: false }}
        ref={(current) => {
          if (current) {
            tumbler.current.trigger('useNavigator', () => current);
            NavigationService.setTopLevelNavigator(current);
            supportPathRouter(host, current);
          }
        }}
        linking={{
          prefixes,
          config: linkConfig,
          getStateFromPath,
        }}
        onReady={() => {
          // 优化 ios h5 滚动橡皮筋效果：https://github.com/lazd/iNoBounce
          isIosWeb && import('utils/iNoBounce');
        }}
        onStateChange={() => {
          injectDefaultWechatShare();
        }}
      >
        <Navigator startRoute={initialRouteName} />
      </NavigationContainer>
    );
  }, []);

  const getInitialApp = useCallback(() => {
    tumbler.current.useApp(<Privacy agreeCallback={setAgree} />);
  }, []);

  useEffect(() => {
    async function renderContainer() {
      const initialRouteName = await getInitialRouteName();
      const isEntranceApp = agree || initialRouteName !== 'Privacy' || isWeb;
      const isPrivacy = initialRouteName === 'Privacy';

      if (isPrivacy) {
        getInitialApp();
      }

      if (isEntranceApp) {
        // eslint-disable-next-line no-nested-ternary
        getNavigationApp(!agree ? initialRouteName : forceShowGuide ? 'Guide' : 'Main');
        // 已经同意隐私政策并且是非初次进入则自动native端初始化
        if (!agree) {
          await appInit();
        }
      }

      rootElement.current = await tumbler.current.render(isEntranceApp ? 'all' : 'origin');
      forceUpdate();
      if (isIOS) {
        await RNBootSplash.hide();
      }
      // wakeApp({scheme: 'ddyd:///'})
    }
    renderContainer();
  }, [agree, forceUpdate, getInitialApp, getNavigationApp]);

  return rootElement.current;
}
