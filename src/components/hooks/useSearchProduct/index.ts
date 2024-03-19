import { useEffect, useCallback } from 'react';
import { useCommonData } from '@terminus/mall-base';
import { NavigationService } from '@terminus/react-navigation';

interface IOptions {
  keyId: string;
  title?: boolean;
  clearAtDestroy?: boolean;
}

export default function useSearchProduct(
  { keyId, title, clearAtDestroy = true }: IOptions = { keyId: 'selectProduct' }
) {
  const { selectedProduct, refresh } = useCommonData();

  const dispatchSelect = useCallback(
    () => NavigationService.navigate('SearchProduct', { title, keyId }),
    [keyId, title]
  );

  const setSelected = useCallback(
    (value?: any) => {
      refresh('selectedProduct', () => (value ? { key: keyId, value } : null));
    },
    [keyId, refresh]
  );

  useEffect(() => {
    return () => clearAtDestroy && setSelected();
  }, [clearAtDestroy, setSelected]);

  return { selected: selectedProduct?.key === keyId ? selectedProduct?.value : undefined, dispatchSelect, setSelected };
}
