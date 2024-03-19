/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback } from 'react';
import { useQuery } from '@terminus/octopus-core';
import { NavigationService } from '@terminus/react-navigation';
import BasePage from 'common/base-page';
import CategoryItems from 'common/category-items';
import SearchHeader from 'common/category-items/children/search-header';
import { getItemsByCategory, getItemsCategory } from './service';
import styles from './style';

export default function SelectProduct() {
  const { title = '选择商品', keyId = 'selectProduct' } = useQuery();

  const handleNext = useCallback((selectList, selectMap) => {
    console.log('handleNext', selectList, selectMap);
    NavigationService.goBack();
  }, []);

  const renderHeader = useCallback(() => {
    return <SearchHeader keyId={keyId} />;
  }, [keyId]);

  return (
    <BasePage title={title} rightContent={null}>
      <CategoryItems
        listWrapStyle={styles.listContainer}
        renderHeader={renderHeader}
        getItemsCategory={getItemsCategory}
        getPruductsByCategory={getItemsByCategory}
        handleNext={handleNext}
      />
    </BasePage>
  );
}
