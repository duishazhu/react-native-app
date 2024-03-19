/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from 'common/footer';
import { usePagination, useRequest } from 'hooks';
import { View } from 'react-native';
import { Loading } from '@terminus/nusi-mobile';
import FooterView from './children/footer';
import ProductCategoryList from './children/product-category-list';
import ProductList from './children/product-list';
import { ProductProvider } from './product-context';
import styles from './style';

export interface IProps {
  getItemsCategory: () => Promise<any>;
  getPruductsByCategory: () => Promise<any>;
  handleNext: (selectList?: any[], selectMap?: Map<string, any>) => void;
  renderGoodItem?: (item: any, index: number) => React.ReactElement | null | undefined;
  renderHeader?: () => React.ReactElement | null | undefined;
  renderFooter?: () => React.ReactElement | null | undefined;
  style?: any;
  listWrapStyle?: any;
}

export default function CategoryItems(props: IProps) {
  const {
    getItemsCategory,
    getPruductsByCategory,
    handleNext,
    renderGoodItem,
    renderHeader,
    renderFooter,
    style,
    listWrapStyle,
  } = props;

  const rightRef = useRef();
  const [products, setProducts] = useState([]);

  const { result: categoryData, loading } = useRequest(getItemsCategory);

  const {
    result: itemDataResult,
    loadMore,
    renderFooter: renderListFooter,
    setArgs,
  } = usePagination(getPruductsByCategory);

  useEffect(() => {
    if (itemDataResult) {
      setProducts(itemDataResult.data);
    }
  }, [itemDataResult]);

  const onCategoryChange = useCallback(
    (categoryId) => {
      if (categoryId) {
        setProducts([]);
        // @ts-ignore
        rightRef?.current?.scrollToTop();
        setArgs((prev) => ({
          // @ts-ignore
          ...prev,
          pageNo: 1,
          categoryId,
        }));
      }
    },
    [setArgs]
  );

  return (
    <ProductProvider>
      <Loading toast visible={loading} />
      <View style={[{ flexDirection: 'column', flex: 1 }, style]}>
        {typeof renderHeader === 'function' ? renderHeader() : null}
        <View style={[styles.listContainer, listWrapStyle]}>
          <ProductCategoryList
            categoryData={categoryData?.data || []}
            style={styles.categoryContainer}
            onCategoryChange={onCategoryChange}
          />
          <ProductList
            ref={rightRef}
            productData={products}
            // @ts-ignore
            renderListFooter={renderListFooter}
            renderGoodItem={renderGoodItem}
            listLoadMore={loadMore}
            style={styles.itemContainer}
          />
        </View>
        <Footer>{typeof renderFooter === 'function' ? renderFooter() : <FooterView handleNext={handleNext} />}</Footer>
      </View>
    </ProductProvider>
  );
}
