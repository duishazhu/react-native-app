import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import FlatList from 'common/flat-list';
import { ProductContext } from '../product-context';
import styles from '../style';

const ProductCategoryList = ({ categoryData, onCategoryChange, style }) => {
  const { updateSelectedCategoryId } = useContext(ProductContext);
  const [activeCategoryId, setActiveCategoryId] = useState<any>();

  const handleCategorySelect = useCallback(
    (categoryId: string | number) => {
      setActiveCategoryId(categoryId);
      onCategoryChange?.(categoryId);
      updateSelectedCategoryId(categoryId);
    },
    [onCategoryChange, updateSelectedCategoryId]
  );

  // 左侧一级类目列表item
  const renderLeftItem = useCallback(
    ({ item }) => {
      const { id, name } = item || {};
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            handleCategorySelect(id);
          }}
          key={`${id}_first`}
        >
          <View style={[styles.firstCategoryItem, id === activeCategoryId && styles.firstCategoryItemActive]}>
            <Text
              style={[styles.firstCategoryTitle, id === activeCategoryId && styles.firstCategoryTitleActive]}
              numberOfLines={2}
            >
              {name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [activeCategoryId, handleCategorySelect]
  );

  useEffect(() => {
    if (!activeCategoryId && categoryData) {
      handleCategorySelect(categoryData[0]?.id);
    }
  }, [activeCategoryId, categoryData, handleCategorySelect]);

  return (
    <FlatList
      listKey="category-left"
      style={style}
      showsVerticalScrollIndicator={false}
      data={categoryData}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderLeftItem}
      extraData={activeCategoryId}
    />
  );
};

export default ProductCategoryList;
