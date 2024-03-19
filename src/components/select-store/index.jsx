import { useCommonData } from '@terminus/mall-base';
import { Loading } from '@terminus/nusi-mobile';
import { useQuery } from '@terminus/octopus-core';
import { NavigationService } from '@terminus/react-navigation';
import BasePage from 'common/base-page';
import SearchBar from 'common/search-bar';
import useRequest from 'hooks/useRequest';
import useStoreInfo from 'hooks/useStoreInfo';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import Button from 'common/button';
import FlatList from 'common/flat-list';
import Footer from 'common/footer';
import { Icon } from 'common/icon';
import CascadeHeader from 'select-store/children/cascade-header';
import { getStoreList } from 'select-store/helper';
import { getCityStoreList } from 'select-store/service';
import styles from 'select-store/style';

export default function SelectStore() {
  const { selectFor } = useQuery();
  const { storeInfo, setStoreId } = useStoreInfo();
  const { selectedStore, refresh } = useCommonData();
  const [selectAddress, setSelectAddress] = useState([]);
  const [data, setData] = useState([]);
  const store = selectFor === 'field' ? selectedStore : storeInfo;
  const [selectStoreItem, setSelectStoreItem] = useState(store);

  const [keyword, setKeyword] = useState();
  const [picking, setPicking] = useState(false);

  const { result, loading } = useRequest(getCityStoreList);

  const allStoreList = useMemo(() => getStoreList(result || []), [result]);

  const handleSelectStore = useCallback(
    async (item) => {
      if (store?.id !== item.id) {
        if (selectFor === 'field') {
          await refresh('selectedStore', item || null);
        } else {
          setPicking(true);
          try {
            await setStoreId(item.id);
            // eslint-disable-next-line no-empty
          } catch {}
          setPicking(false);
        }
        NavigationService.pop();
      } else {
        NavigationService.pop();
      }
    },
    [store?.id, selectFor, refresh, setStoreId]
  );

  const filterStoreList = useMemo(() => {
    if (keyword) {
      return allStoreList.filter((item) => item.name.includes(keyword));
    }
    return [];
  }, [allStoreList, keyword]);

  const handleClickItem = useCallback((item) => {
    if (item?.childList) {
      setData((prev) => [...prev, item.childList]);
      setSelectAddress((prev) => [...prev, item.name || '']);
    } else {
      setSelectStoreItem(item);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      const { name, childList, id } = item || {};
      const isChecked = id && selectStoreItem?.id === id;
      return (
        <TouchableWithoutFeedback onPress={() => handleClickItem(item)}>
          <View style={styles.listItem}>
            <Text style={styles.listItemName}>{name}</Text>
            {childList ? <Icon type="icon-arrow-right" size={18} color="#7D7E80" /> : null}
            {isChecked ? <Icon type="icon-success-tick" width={18} height={12} style={{ marginRight: 2 }} /> : null}
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [handleClickItem, selectStoreItem?.id]
  );

  const handleConfirm = useCallback(() => {
    if (selectStoreItem) {
      handleSelectStore(selectStoreItem);
    }
  }, [handleSelectStore, selectStoreItem]);

  const handleCascadeClick = useCallback(
    (_, index) => {
      setData((prev) => prev.slice(0, index + 1));
      setSelectAddress((prev) => prev.slice(0, index + 1));
      setSelectStoreItem(store);
    },
    [store]
  );

  const listData = useMemo(() => (data?.length > 0 ? data[data.length - 1] : result || []), [data, result]);
  const confirmDisabled = useMemo(
    () => !selectStoreItem || selectStoreItem.id === store?.id,
    [selectStoreItem, store?.id]
  );
  return (
    <BasePage title="选择门店">
      <SearchBar placeholder="请输入门店名称搜索" onChange={setKeyword} />
      {filterStoreList.length ? (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {filterStoreList.map((item) => {
            const nameList = item.name.split(keyword);
            const text = nameList.map((it, index) =>
              !index ? (
                it
              ) : (
                <React.Fragment key={index}>
                  <Text style={styles.activeStoreText}>{keyword}</Text>
                  {it}
                </React.Fragment>
              )
            );
            return (
              <TouchableWithoutFeedback key={item.id} onPress={() => handleSelectStore(item)}>
                <View style={styles.filterStore}>
                  <Text style={styles.filterStoreText}>{text}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      ) : (
        <>
          <CascadeHeader style={styles.cascadeHeader} selectList={selectAddress} onItemPress={handleCascadeClick} />
          <FlatList
            style={{ width: '100%', flex: 1 }}
            keyExtractor={(_, index) => `select-store-${index}`}
            data={listData}
            renderItem={renderItem}
          />
          <Footer>
            <Button type="primary" size="large" disabled={confirmDisabled} onPress={handleConfirm}>
              确定
            </Button>
          </Footer>
        </>
      )}
      <Loading toast visible={loading || picking} />
    </BasePage>
  );
}
