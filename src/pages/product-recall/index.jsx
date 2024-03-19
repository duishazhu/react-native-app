import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import FlatList from 'common/flat-list';
import usePagination from 'hooks/usePagination';
import { getPointOrderList } from 'point-order/services';
import Filter from 'common/filter';
import Card from 'common/card';
import Tag from 'common/tag';
import SearchBar from 'common/search-bar';
import { Icon } from '@terminus/nusi-mobile';
import Cell from 'pages/store-order/widget/cell';
import useStoreSelect from 'hooks/useStoreSelect';
import { filterFields, typeVal } from './constants';

const ProductRecall = () => {
  const [query, setQuery] = useState();
  const { result, loadMore, renderFooter } = usePagination(getPointOrderList);
  const { dispatchSelect } = useStoreSelect();

  const renderItem = ({ type }) => {
    return (
      <Card actions={typeVal[type].btns}>
        <TouchableOpacity onPress={() => NavigationService.navigate('RecallApplication', { type })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>乐事薯片召回通知</Text>
            <Tag type={typeVal[type].tagType}>{typeVal[type].tagValue}</Tag>
          </View>
          <View style={{ height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
          {typeVal[type].rows.map((el) => {
            return <Cell label={el.label} value={el.value} />;
          })}
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <BasePage
      headerStyle={{ backgroundColor: '#FAFAFA' }}
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="商品召回"
      onLeftClick={() => NavigationService.goBack()}
    >
      <SearchBar />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Text onPress={dispatchSelect}>
          门店
          <Icon color="#DCDEE0" type="icon-triangle" />
        </Text>
        <Filter values={query} fields={filterFields} onSubmit={setQuery} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={
          [
            { id: 1, type: 'dispose' },
            { id: 2, type: 'audit' },
            { id: 3, type: 'sendBack' },
            { id: 4, type: 'closing' },
            { id: 5, type: 'accomplish' },
            { id: 6, type: 'close' },
          ] || result?.data
        }
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={renderFooter}
      />
    </BasePage>
  );
};

export default ProductRecall;
