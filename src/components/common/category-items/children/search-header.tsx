/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import SearchBar from 'common/search-bar';
import useSearchProduct from 'hooks/useSearchProduct';
import { useCommonData } from '@terminus/mall-base';
import UpdateSelectedProduct from './update-selected-product';
import { ProductContext } from '../product-context';

const SearchHeader = ({ keyId }) => {
  const { refresh } = useCommonData();
  const { selectedProducts } = useContext(ProductContext);
  const { selected, dispatchSelect } = useSearchProduct({ keyId });

  useEffect(() => {
    if (selectedProducts && keyId) {
      refresh('selectedProduct', () => ({ key: `${keyId}-searchTemp`, value: selectedProducts }));
    }
    return () => {
      refresh('selectedProduct', () => ({ key: `${keyId}-searchTemp`, value: null }));
    };
  }, [keyId, refresh, selectedProducts]);

  return (
    <TouchableWithoutFeedback onPress={dispatchSelect}>
      <View
        style={{
          width: '100%',
        }}
      >
        <UpdateSelectedProduct selectedValue={selected} />
        {/* @ts-ignore */}
        <SearchBar placeholder="输入商品名称、条码、助记码" disabled />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchHeader;
