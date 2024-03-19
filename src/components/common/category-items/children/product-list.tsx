/* eslint-disable @typescript-eslint/ban-ts-comment */
import Product from 'common/product';
import React, { forwardRef, useCallback, useContext, useImperativeHandle, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { ProductContext } from '../product-context';
import styles from '../style';

export interface IProps {
  productData: any[];
  renderGoodItem?: (item: any, index: number) => React.ReactElement | null | undefined;
  renderListFooter?: React.ComponentType<any> | React.ReactElement | null | undefined;
  listLoadMore?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
  style: any;
}

const ProductList = forwardRef((props: IProps, ref) => {
  const { productData = [], renderGoodItem, renderListFooter, listLoadMore, style } = props;
  const { selectedCategoryId, selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const rightRef = useRef();

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      // @ts-ignore
      rightRef.current?.scrollToOffset({ offset: 0, animated: false });
    },
  }));

  // 右侧商品行
  const renderItemRow = useCallback(
    ({ item, index }) => {
      const { id, goodTitle, image, price, unit } = item || {};
      const selectItemKey = `${selectedCategoryId}-${id}`;
      const selectCount = selectedProducts?.get(selectItemKey)?.selectCount;
      return (
        <View key={`${id}-${index}`}>
          {renderGoodItem ? (
            renderGoodItem(item, index)
          ) : (
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
                  setSelectedProducts({ ...item, categoryId: selectedCategoryId }, value);
                  return value;
                },
                step: 1,
                max: Number.MAX_VALUE,
                min: 0,
                value: selectCount,
              }}
            />
          )}
        </View>
      );
    },
    [selectedCategoryId, selectedProducts, renderGoodItem, setSelectedProducts]
  );

  return (
    <FlatList
      listKey="item-list-right"
      ref={rightRef}
      style={style}
      data={productData}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItemRow}
      onEndReachedThreshold={0.2}
      onEndReached={listLoadMore}
      ListFooterComponent={renderListFooter}
    />
  );
});

export default ProductList;
