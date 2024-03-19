import { useCallback, useEffect } from 'react';
import { useCommonData } from '@terminus/mall-base';
import { setStore, getStore } from './service';

export default function useStoreInfo() {
  const { storeInfo, refresh } = useCommonData();

  const getStoreInfo = useCallback(async () => {
    const result = await getStore();
    if (result) {
      await refresh('storeInfo', result);
    }
    return result;
  }, [refresh]);

  const setStoreId = useCallback(
    async (id) => {
      await setStore(id);
      await getStoreInfo();
    },
    [getStoreInfo]
  );

  useEffect(() => {
    if (!storeInfo) {
      getStoreInfo();
    }
  }, [getStoreInfo, storeInfo]);

  return { storeInfo, setStoreId, getStoreInfo };
}
