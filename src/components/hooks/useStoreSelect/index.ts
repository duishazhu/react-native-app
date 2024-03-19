import { useEffect, useCallback } from 'react';
import { useCommonData } from '@terminus/mall-base';
import { NavigationService } from '@terminus/react-navigation';

interface IOptions {
  multiple?: boolean;
  clearAtDestroy?: boolean;
}

export default function useStoreSelect({ multiple, clearAtDestroy = true }: IOptions = {}) {
  const { selectedStore, selectedStoreMultiple, refresh } = useCommonData();

  const dispatchSelect = useCallback(
    () => NavigationService.navigate(multiple ? 'SelectStoreMultiple' : 'SelectStore', { selectFor: 'field' }),
    [multiple]
  );

  const setSelected = useCallback(
    (value?: any) => {
      refresh(multiple ? 'selectedStoreMultiple' : 'selectedStore', () => value || null);
    },
    [multiple, refresh]
  );

  useEffect(() => {
    return () => clearAtDestroy && setSelected();
  }, [clearAtDestroy, setSelected]);

  return { selected: multiple ? selectedStoreMultiple : selectedStore, dispatchSelect, setSelected };
}
