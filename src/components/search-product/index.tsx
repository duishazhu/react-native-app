/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Loading } from '@terminus/nusi-mobile';
import BasePage from 'common/base-page';
import FlatList from 'common/flat-list';
import { useCommonData } from '@terminus/mall-base';
import { usePagination } from 'hooks';
import Product from 'common/product';
import SearchBar from 'common/search-bar';
import { useQuery } from '@terminus/octopus-core';
import styles from './style';
import { searchProduct } from './service';

export default function SearchProduct() {
  const { keyId, title = '商品搜索' } = useQuery();
  const [keyword, setKeyword] = useState();
  const { refresh, selectedProduct } = useCommonData();
  const initSelectedValue = selectedProduct?.key === `${keyId}-searchTemp` ? selectedProduct?.value : undefined;
  const [selectedProducts, setSelectedProductValues] = useState<Map<string, any>>(initSelectedValue);

  const setSelected = useCallback(
    (value?: any) => {
      if (!keyId) {
        return;
      }
      refresh('selectedProduct', () => (value ? { key: keyId, value } : null));
    },
    [keyId, refresh]
  );

  const { result, loading, loadMore, renderFooter, setArgs } = usePagination(searchProduct);

  const setSelectedProducts = useCallback((productItem, value) => {
    const { categoryId, id } = productItem || {};
    if (!categoryId || !id) {
      return;
    }
    const selectItemKey = `${categoryId}-${id}`;
    let selectCount;
    let selectedValue;
    if (typeof value === 'number') {
      selectCount = value;
    } else if (typeof value === 'object') {
      selectCount = value.quantity;
      selectedValue = value;
    }
    setSelectedProductValues((prev) =>
      new Map(prev).set(selectItemKey, { ...productItem, selectCount, selectedValue })
    );
  }, []);

  useEffect(() => {
    if (keyword) {
      setArgs((prev) => ({
        // @ts-ignore
        ...prev,
        pageNo: 1,
        searchVal: keyword,
      }));
    }
  }, [keyword, setArgs]);

  useEffect(() => {
    if (selectedProducts) {
      setSelected(selectedProducts);
    }
  }, [selectedProducts, setSelected]);

  const renderItem = useCallback(
    ({ item, index }) => {
      const { categoryId, id, goodTitle, image, price, unit } = item || {};
      const selectItemKey = `${categoryId}-${id}`;
      const selectCount = selectedProducts?.get(selectItemKey)?.selectCount;
      return (
        <View key={`${id}-${index}`}>
          <Product
            key={id}
            style={styles.goodItemWrapper}
            itemName={goodTitle}
            itemImageUrl={image || ''}
            itemImageSize={70}
            itemUnit={unit}
            itemPrice={price}
            itemSubInfoList={['规格', '2日销量']}
            itemTagList={['可退', '在途']}
            quantity={{
              onChange: (value) => {
                setSelectedProducts(item, value);
                return value;
              },
              step: 1,
              max: Number.MAX_VALUE,
              min: 0,
              value: selectCount,
            }}
          />
        </View>
      );
    },
    [selectedProducts, setSelectedProducts]
  );

  return (
    // @ts-ignore
    <BasePage title={title}>
      <Loading visible={loading} toast />
      {/* @ts-ignore */}
      <SearchBar placeholder="输入商品名称、条码、助记码" onSubmit={setKeyword} />
      <FlatList
        data={result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
        // @ts-ignore
        ListFooterComponent={renderFooter}
      />
    </BasePage>
  );
}
