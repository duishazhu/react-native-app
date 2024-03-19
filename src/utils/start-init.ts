import { formatUrl } from '@terminus/mall-utils';
import { getStateFromPath as navigatorGetStateFromPath } from 'configs/navigators/helper';

export function getStateFromPath(path) {
  const { search, pathname } = formatUrl(path.startsWith('/') ? path : `/${path}`);

  const originPath = pathname === '/' ? '/index' : pathname;

  return navigatorGetStateFromPath(`${originPath}${search}`);
}
