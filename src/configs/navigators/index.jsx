import React, { useMemo } from 'react';
import { useEnv } from 'plugin/env-plugin';
import { formatUrl } from '@terminus/mall-utils';
import { isWeb, isWechat } from 'utils/platform';
import { useCommonData } from '@terminus/mall-base';
import { wechatAuthorize } from 'utils/unauthorized';
import AuthStack from 'configs/navigators/auth-navigator';
import loadable from '@loadable/component';
import { MainTab, AliasMainTab } from 'configs/navigators/tabs-navigator';
import { WITHOUT_LOGIN_ROUTES, WITHOUT_REPLACE_ROUTES } from 'configs/request/config';
import {
  NavigationService,
  getActionFromState,
  createStackNavigator,
  TransitionPresets,
} from '@terminus/react-navigation';
import {
  getStateFromPath,
  linkConfig,
  mainLinkConfig,
  authLinkConfig,
  businessRouterArray,
} from 'configs/navigators/helper';

// 主导航
const RootStack = createStackNavigator();

function renderScreen(config) {
  const { routeName, screen } = config;

  return <RootStack.Screen key={routeName} name={routeName} getComponent={() => loadable(screen)} />;
}

export function Navigator({ startRoute }) {
  const {
    routeController: { showAuth },
    user,
  } = useCommonData();
  const { host } = useEnv();
  supportPathRouter(host, {}, user.id);
  return useMemo(
    () => (
      <RootStack.Navigator
        initialRouteName={isWeb ? 'Main' : startRoute}
        screenOptions={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
          replaceAnimation: 'push',
          cardStyle: { flex: 1 },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <RootStack.Screen name="Main" component={MainTab} />
        <RootStack.Screen name="AliasMain" component={AliasMainTab} />
        {(!user?.id || showAuth) && <RootStack.Screen name="Auth" component={AuthStack} />}
        {businessRouterArray.map(renderScreen)}
      </RootStack.Navigator>
    ),
    [startRoute, user, showAuth]
  );
}

/**
 * 让NavigationService.navigate支持打开装修页面，外链地址的能力
 */

export function supportPathRouter(host, navigation, userId) {
  NavigationService.setNavIntercept((routeName, params, actionType) => {
    const mainAction = isWeb ? 'push' : 'navigate';
    // 如果要跳转的路由不在白名单内，则跳转到授权登录——微信h5，routeName为'xxx'
    if (
      !WITHOUT_LOGIN_ROUTES.concat(WITHOUT_REPLACE_ROUTES).includes(routeName) &&
      !userId &&
      isWechat &&
      !routeName?.path
    ) {
      wechatAuthorize(JSON.stringify({ routeName, params }));
      return true;
    }
    if (mainLinkConfig[routeName]) {
      NavigationService[mainAction]('Main', { screen: routeName, params });
      return true;
    }
    if (authLinkConfig[routeName]) {
      NavigationService[actionType]('Auth', { screen: routeName, params });
      return true;
    }

    if (routeName && routeName.path) {
      const { path } = routeName;
      const location = formatUrl(path);
      const { hostname } = location;

      const query = { ...params, path };

      if (hostname && hostname !== host) {
        NavigationService.push('Activity', query);
        return true;
      }

      const state = getStateFromPath(`${location.pathname}${location.search}`, linkConfig);
      const action = getActionFromState(state);
      const { name } = action.payload;

      // 判断是否有这个路由
      if (name) {
        // routeName为{path: /xxx}判断
        if (!WITHOUT_LOGIN_ROUTES.concat(WITHOUT_REPLACE_ROUTES).includes(name) && !userId && isWechat) {
          wechatAuthorize(JSON.stringify({ name, params }));
          return true;
        }
        // 防止params丢失
        if (name === 'Activity') {
          NavigationService.push('Activity', query);
          return true;
        }

        NavigationService[actionType === 'replace' ? 'replace' : 'push'](name, action.payload.params);
        return true;
      }

      NavigationService.push('Activity', query);
      return true;
    }
    return false;
  });
}

export { linkConfig };
