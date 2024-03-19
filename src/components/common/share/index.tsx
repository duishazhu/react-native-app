import React, { useRef, useEffect, useCallback, useState } from 'react';
import { request } from '@terminus/mall-utils';
import { useOnShareAppMessage } from '@terminus/octopus-hooks';
import { Button } from '@terminus/octopus-core';
import useRefCallback from 'hooks/useRefCallback';
import { getStyle } from 'common/helper';

interface IProps {
  style?: any;
  title?: string;
  path?: string;
  image?: string;
  type?: 'item' | 'group' | 'secKill';
  /**
   * data - item: { itemImageUrl, itemName, itemPrice, itemUnit }
   * data - group: { itemImageUrl, itemName, itemPrice, itemUnit, groupNum }
   * data - secKill: { itemImageUrl, itemName, itemPrice, itemUnit }
   */
  data?: Record<string, any>;
  children: any;
}

function getImageUrl(type, data) {
  return request(`/api/herd/share/${type}`, { data });
}

export default function Share({ style, title, path, image, type, data, children }: IProps) {
  const [loading, setLoading] = useState(false);

  const imageUrl = useRef(image);

  const fetchImageUrl = useCallback(async () => {
    if (!imageUrl.current) {
      setLoading(true);
      try {
        imageUrl.current = await getImageUrl(type, data);
        // eslint-disable-next-line no-empty
      } catch {}
      setLoading(false);
    }
  }, [data, type]);

  const fetchShareConfig = useRefCallback(async () => {
    await fetchImageUrl();
    return { title, path, imageUrl: imageUrl.current };
  });

  useOnShareAppMessage(fetchShareConfig);

  useEffect(() => {
    imageUrl.current = image;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), type, image]);

  return (
    <Button openType="share" disabled={loading} className="common-share-container" style={getStyle(style)}>
      {children}
    </Button>
  );
}

Share.defaultProps = {
  title: '零食很忙',
  path: '/pages/privacy-agreement/index',
  type: 'item',
};
