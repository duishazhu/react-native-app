import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import FlatList from 'common/flat-list';
import usePagination from 'hooks/usePagination';
import Filter from 'common/filter';
import Card from 'common/card';
import Tag from 'common/tag';
import { Icon } from '@terminus/nusi-mobile';
import Cell from 'pages/store-order/widget/cell';
import Footer from 'common/footer';
import useStoreSelect from 'hooks/useStoreSelect';
import { queryCashList } from './service';
import { filterFields, typeVal } from './constants';

const CashPayment = () => {
  const [query, setQuery] = useState();
  const { result, loadMore, renderFooter } = usePagination({
    getData: queryCashList,
    initArgs: {
      payInCode: '',
      storeCode: '',
      statusList: [],
      createdAtStartTime: '',
      createdAtEndTime: '',
    },
  });
  const { dispatchSelect } = useStoreSelect();

  const renderItem = ({ type }) => {
    return (
      <Card actions={typeVal[type].btns}>
        <TouchableOpacity onPress={() => NavigationService.navigate('ReceiptsDetails', { type })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>JK2320090002</Text>
            <Tag type={typeVal[type].tagType}>{typeVal[type].tagValue}</Tag>
          </View>
          <View style={{ height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
          {typeVal[type].rows.map((el) => {
            return <Cell label={el.label} value={el.value} style={el.style} />;
          })}
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="现金缴款"
      onLeftClick={() => NavigationService.goBack()}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Text onPress={dispatchSelect}>
          门店
          <Icon color="#DCDEE0" type="icon-triangle" />
        </Text>
        <Filter values={query} fields={filterFields} onSubmit={setQuery} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={renderFooter}
      />
      <Footer actions={[{ children: '新建缴款单', onPress: () => NavigationService.navigate('NewReceipts') }]} />
    </BasePage>
  );
};

export default CashPayment;
