import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import uniqBy from 'lodash/uniqBy';
import { Loading, Checkbox, Toast } from '@terminus/nusi-mobile';
import { useCommonData } from '@terminus/mall-base';
import { NavigationService } from '@terminus/react-navigation';
import BasePage from 'common/base-page';
import Footer from 'common/footer';
import { Icon } from 'common/icon';
import useRequest from 'hooks/useRequest';
import useStoreInfo from 'hooks/useStoreInfo';
import { getStoreList } from 'select-store/helper';
import { getDistrictStoreList } from 'select-store/service';
import { commonStyle } from 'styles';
import { multipleStyles as styles } from 'select-store/style';
import 'select-store/index.scss';

const StoreTreeContext = createContext();

function Item({ level = 0, data }) {
  const { selected, onSelect } = useContext(StoreTreeContext);

  const storeList = useMemo(() => getStoreList([data]), [data]);

  const defaultVisible = useMemo(() => {
    return storeList.some((store) => !!selected.find(({ id }) => store.id === id));
  }, [selected, storeList]);

  const [visible, setVisible] = useState(defaultVisible);

  const checked = useMemo(() => {
    return storeList.every((store) => !!selected.find(({ id }) => store.id === id));
  }, [selected, storeList]);

  const handleChange = useCallback(
    (value, e) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(value, storeList);
    },
    [onSelect, storeList]
  );

  return (
    <>
      <TouchableWithoutFeedback disabled={!data.childList?.length} onPress={() => setVisible((prev) => !prev)}>
        <View className="select-store-multiple-tree-item" style={[styles.item, { paddingLeft: level * 26 }]}>
          <View style={commonStyle.flexRow}>
            <Checkbox checked={checked} onChange={handleChange} />
            <Text style={styles.itemText}>{data.name}</Text>
          </View>
          {!!data.childList?.length && (
            <Icon type={visible ? 'icon-arrow-down' : 'icon-arrow-right'} size={18} color="#7D7E80" />
          )}
        </View>
      </TouchableWithoutFeedback>
      {!!data.childList?.length &&
        visible &&
        data.childList.map((item) => <Item key={item.districtId || item.id} level={level + 1} data={item} />)}
    </>
  );
}

export default function SelectStoreMultiple() {
  const { selectedStoreMultiple, refresh } = useCommonData();
  const { storeInfo } = useStoreInfo();
  const [selected, setSelected] = useState(selectedStoreMultiple || [storeInfo].filter((item) => item));

  const { result: data, loading } = useRequest(getDistrictStoreList);

  const handleSelect = useCallback((checked, storeList) => {
    if (checked) {
      setSelected((prev) => {
        const result = [...prev, ...storeList];
        return uniqBy(result, 'id');
      });
    } else {
      setSelected((prev) => {
        return prev.filter(({ id }) => !storeList.find((item) => item.id === id));
      });
    }
  }, []);

  const handleConfirm = useCallback(async () => {
    let delayForShow = 0;
    if ((!selected || selected.length === 0) && storeInfo?.id) {
      Toast.info('已默认首页权限');
      delayForShow = 1200;
    }
    await refresh('selectedStoreMultiple', selected || null);
    setTimeout(() => {
      NavigationService.pop();
    }, delayForShow);
  }, [refresh, selected, storeInfo?.id]);

  const providerValue = useMemo(() => ({ selected, onSelect: handleSelect }), [handleSelect, selected]);

  return (
    <BasePage title="选择门店">
      <Loading toast visible={loading} />
      <ScrollView contentContainerStyle={styles.page}>
        {!!data?.length && (
          <StoreTreeContext.Provider value={providerValue}>
            <View style={styles.container}>
              {data.map((item) => (
                <Item key={item.districtId} data={item} />
              ))}
            </View>
          </StoreTreeContext.Provider>
        )}
      </ScrollView>
      <Footer actions={[{ onPress: handleConfirm }]}>
        <View style={styles.selectedTip}>
          <Text style={styles.selectedTipLabel}>已选门店数</Text>
          <Text style={styles.selectedTipText}>{selected.length}</Text>
        </View>
      </Footer>
    </BasePage>
  );
}
