import { AsyncStorage, Toast } from '@terminus/nusi-mobile';
import { request } from '@terminus/mall-utils';
import { isWechat, isWxWebview } from 'utils/platform';
import { WITHOUT_LOGIN_ROUTES, WITHOUT_REPLACE_ROUTES } from 'configs/request/config';
import { NavigationService } from '@terminus/react-navigation';

export async function unauthorized(data, response, options) {
  if (options.preventToLogin) {
    return;
  }
  await loginIntercept();
  if (options.quiet === false) {
    Toast.fail(request.getMessage(data, '未登录'));
  }
}

export function wechatAuthorize(type) {
  // 如果历史记录只有当前页面，则replace为首页，防止返回到需要登录的页面循环跳转
  if (window.history.length === 1) {
    window.history.replaceState({}, '', '/index');
  }
  if (type === 'replace') {
    window.location.replace(`/api/user/web/third-part/authorization?targetUrl=&type=wechat_mp`);
    return;
  }
  window.location.href = `/api/user/web/third-part/authorization?targetUrl=&type=wechat_mp`;
}

// 未登录情况下跳去登录页（微信h5跳去微信授权）
export async function loginIntercept() {
  const { name: routeName, params } = NavigationService.getCurrentNav() || {};

  // 如果在login遇到401，无需跳转
  if (routeName === 'Login') {
    return;
  }

  if (routeName) {
    const from = JSON.stringify({ routeName, params });
    await AsyncStorage.set('authorized_from', from);
    const routeType = !WITHOUT_REPLACE_ROUTES.includes(routeName) ? 'replace' : 'navigate';

    if (WITHOUT_LOGIN_ROUTES.includes(routeName)) {
      return;
    }

    if (isWechat && !isWxWebview) {
      wechatAuthorize(routeType);
      return;
    }

    NavigationService[routeType]('Auth', { screen: 'Login' });
  }
}
