import { NavigationService } from '@terminus/react-navigation';
import { formatUrl, getQueryData } from '@terminus/mall-utils';

export function supportPathRouter() {
  NavigationService.setNavIntercept((route, params) => {
    if (route === 'Auth') {
      NavigationService.navigate(params?.screen, params);
      return true;
    }
    if (route && route.path) {
      const location = formatUrl(route.path);
      const { pathname, search } = location;

      const { routeName, params: _params } = NavigationService.getRouteNameByPathAndParams(pathname, {
        ...params,
        ...getQueryData(search),
      });
      if (routeName) {
        NavigationService.navigate(routeName, _params);
        return true;
      }
    }
    return false;
  });
}
