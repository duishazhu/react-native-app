import React, { useCallback, useState, useRef } from 'react';
import { AsyncStorage, WebView } from '@terminus/nusi-mobile';
import { useOnShow, useQuery, useOnShareAppMessage } from '@terminus/octopus-hooks';
import { NavigationService } from '@terminus/react-navigation';
import { parse } from 'qs';
import { useCommonData } from '@terminus/mall-base';

function WebPage() {
  const query = useQuery();
  const { uri: sourceUri } = query || {};
  const { user } = useCommonData();

  const [uri, setUri] = useState(null);

  const shareContent = useRef({});

  const init = useCallback(() => {
    if (!user?.id) {
      NavigationService.replace('Login');
    } else {
      AsyncStorage.get('Token').then((token) => {
        setUri(`${sourceUri}&token=${token || ''}`);
      });
    }
  }, [user, sourceUri]);

  useOnShow(init);

  useOnShareAppMessage(() => {
    const { link, title: shareTitle, imgUrl } = shareContent.current || {};
    return {
      title: shareTitle || '零食很忙',
      path: link ? `/pages/web-page/index?uri=${encodeURIComponent(link)}` : '/pages/privacy-agreement/index',
      imageUrl: imgUrl,
    };
  });

  const onMessage = (msg) => {
    const { detail } = msg;
    const originData = Array.isArray(detail?.data) ? detail?.data?.filter((d) => d?.link) : [];
    const filterData =
      originData.filter((d) => {
        const shareLinkSearch = d?.link?.split('?')[1] || '';
        const { shareCode, taskId } = parse(shareLinkSearch);
        return shareCode && taskId;
      }) || [];
    shareContent.current = filterData[filterData.length - 1] || originData[originData.length - 1];
    // eslint-disable-next-line no-console
    console.log('shareData', originData);
    // eslint-disable-next-line no-console
    console.log('filteredShareData', filterData);
    // eslint-disable-next-line no-console
    console.log('shareContent', shareContent.current);
  };

  return uri && <WebView source={{ uri }} onMessage={onMessage} />;
}

export default WebPage;
