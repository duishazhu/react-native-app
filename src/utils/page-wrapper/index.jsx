import React, { useCallback } from 'react';
import useCurrentRoute from 'hooks/useCurrentRoute';
import { formatUrl } from '@terminus/mall-utils';
import { useCommonData, useDesign } from '@terminus/mall-base';
import { AsyncStorage } from '@terminus/nusi-mobile';
import { useOnShow } from '@terminus/octopus-hooks';
import trackEvent from 'utils/track-event';
import { isWeb } from 'utils/platform';

const pageCategoryMap = {
  Home: '首页',
  Search: '商品列表页',
  Activity: '活动页',
  ItemDetail: '商品详情页',
};

export default (Component) => (props) => {
  const { getPageData } = useDesign();
  const { user } = useCommonData();
  const { routeName, url, params } = useCurrentRoute();

  useOnShow(
    useCallback(() => {
      const { path = '', itemId } = params || {};

      // 装修页处理
      const location = formatUrl(path);
      const { pathname, search = '' } = location;
      const { page } = getPageData(pathname, search) || {};
      const { title, name: pageName } = page || {};
      const currentPageName = routeName === 'Activity' ? title || pageName : routeName;
      const sendTrackEvent = async () => {
        const previousRouteStr = await AsyncStorage.get('previousRouteName');
        const { name: previousRouteName, url: referUrl } = JSON.parse(previousRouteStr || '{}');
        const obj = {
          eventId: 'Um_Event_PageView',
          args: {
            Um_Key_PageName: currentPageName || '',
            Um_Key_PageCategory: pageCategoryMap[routeName] || '其他',
            Um_Key_SourcePage: previousRouteName || '',
            Um_Key_ReferUrl: isWeb ? document?.referrer || referUrl || '' : referUrl || '',
            Um_Key_Url: url || '',
            Um_Key_GoodsID: `${itemId || ''}`,
            Um_Key_UserID: `${user?.id || ''}`,
          },
        };
        if (routeName) {
          trackEvent(obj);
          await AsyncStorage.set('previousRouteName', JSON.stringify({ name: currentPageName, url }));
        }
      };
      sendTrackEvent();
    }, [routeName, url]) // eslint-disable-line
  );
  return <Component {...props} />;
};
