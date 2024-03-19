import { getStateFromPath as defaultGetStateFromPath } from '@terminus/react-navigation';
import { basicRouterConfig } from 'routers/basic';
import { businessRouter } from 'routers/business';
import { isWeb } from 'utils/platform';

const { Main, Auth, AliasMain } = basicRouterConfig;

export function convertToLinkConfig(arr) {
  const map = {};
  arr.forEach((item) => {
    map[item.routeName] = { path: item.path };
  });
  return map;
}

export function convertRouteToArray(obj = {}) {
  return Object.keys(obj).map((routeName) => {
    return { ...obj[routeName], routeName };
  });
}

export const mainRouterArray = convertRouteToArray(Main);
export const aliasMainRouterArray = convertRouteToArray(AliasMain);
export const mainLinkConfig = convertToLinkConfig(mainRouterArray);
export const aliasMainLinkConfig = convertToLinkConfig(aliasMainRouterArray);
export const authRouterArray = convertRouteToArray(Auth);
export const authLinkConfig = convertToLinkConfig(authRouterArray);
export const businessRouterArray = convertRouteToArray(businessRouter);

// 路由与路径的关系对象
export const linkConfig = {
  initialRouteName: isWeb ? undefined : 'Main',
  screens: {
    Main: { screens: mainLinkConfig },
    Auth: { screens: authLinkConfig },
    AliasMain: { screens: aliasMainLinkConfig },
    ...convertToLinkConfig(businessRouterArray),
  },
};

/**
 * 判断当前的sate是否可以使用
 * @param {object} state 路由状态
 * @param {object} linkConfig 配置
 */
function stateIsAvailable(state, config) {
  return state.routes.some((route) => {
    const { state: subState = {}, name } = route;
    const subConfig = config[name];
    if (subConfig) {
      if (subState.routes && subState.routes.length) {
        if (subConfig.screens) {
          return stateIsAvailable(subState, subConfig.screens);
        }
        return false;
      }
      if (subConfig.path) {
        return true;
      }
    }
    return false;
  });
}

/**
 * 匹配转换路由，规则为：如果能匹配到静态RouteName返回原始state，匹配失败走装修页面Activity
 * @param {object} state 路由状态
 */
export function getStateFromPath(path) {
  const state = defaultGetStateFromPath(path, linkConfig);

  if (state && stateIsAvailable(state, linkConfig.screens)) {
    return state;
  }

  return { routes: [{ name: 'Activity', params: { path } }] };
}
