import { useEffect, useState } from 'react';
import { useEnv } from 'plugin/env-plugin';
import qs from 'qs';
import { isMp } from 'utils/platform';
import useLinkBuilder from 'hooks/useCurrentRoute/use-link-builder';
import { NavigationService } from '@terminus/react-navigation';
import { useQuery, useRoute } from '@terminus/octopus-hooks';

export default () => {
  const [currentRoute, setCurrentRoute] = useState({});
  const { url: originUrl } = useEnv();
  const { name } = useRoute();
  const params = useQuery();

  const buildLink = useLinkBuilder();

  useEffect(() => {
    // 放入useEffect执行是防止外层context value 变化导致获取的值不对
    const { name: routeName, path } = NavigationService.getCurrentNav() || {};
    const url = isMp ? `${path}?${qs.stringify(params, { arrayFormat: 'comma' })}` : buildLink(name, params);
    setCurrentRoute({ routeName: name || routeName, url: `${originUrl}${url}`, params, path: url });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originUrl, name]);

  return currentRoute as any;
};
