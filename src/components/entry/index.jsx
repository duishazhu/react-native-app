import React, { useCallback } from 'react';
import { View, Image, Platform } from 'react-native';
import { Toast } from '@terminus/nusi-mobile';
import { NavigationService } from '@terminus/react-navigation';
import { useCommonData } from '@terminus/mall-base';
import { useOnShow } from '@terminus/octopus-hooks';
import { login } from 'entry/service';
import styles from 'entry/style';
import LshmLogo from 'images/common/lshm-logo.png';

export default function Entry() {
  const { user, refresh } = useCommonData();

  const dispatchLogin = useCallback(() => {
    if (!user?.id) {
      Platform.API.qy.login({
        success: async ({ code }) => {
          // 临时让未登录也能进
          try {
            await login(code);
            await refresh('user');
            // eslint-disable-next-line no-empty
          } catch {}
          NavigationService.replace('Home');
        },
        fail: () => Toast.fail('登录失败'),
      });
    } else NavigationService.replace('Home');
  }, [refresh, user?.id]);

  useOnShow(dispatchLogin);

  return (
    <View style={styles.page}>
      <Image style={styles.logo} source={LshmLogo} />
    </View>
  );
}
