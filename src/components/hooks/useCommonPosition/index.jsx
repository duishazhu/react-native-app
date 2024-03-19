import { useState } from 'react';
import { useCommonData } from '@terminus/mall-base';
import useRefCallback from 'hooks/useRefCallback';
import { getLocation } from 'hooks/useCommonPosition/utils';

/**
 * autoLocation: 用于存储自动定位信息
 */
function useCommonPosition() {
  const { autoLocation, refresh } = useCommonData();

  const [loading, setLoading] = useState(false);

  const fetchLocation = useRefCallback((type) => {
    setLoading(true);
    return getLocation(type)
      .then((res) => {
        refresh('autoLocation', res);
        return res;
      })
      .catch(() => ({}))
      .finally(() => setLoading(false));
  });

  return { loading, autoLocation, refresh: fetchLocation };
}

export default useCommonPosition;
