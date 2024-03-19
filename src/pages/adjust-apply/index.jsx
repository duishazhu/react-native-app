import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Search from 'pages/store-order/widget/search';
import Tabs from 'common/tabs';
import Filter from 'common/filter';
import FlatList from 'common/flat-list';
import usePagination from 'hooks/usePagination';
import { getPointOrderList } from 'point-order/services';
import Card from 'common/card';
import Tag from 'common/tag';
import Cell from 'pages/store-order/widget/cell';
import Footer from 'common/footer';
import { filterFields, tabs, typeVal } from './constants';

const AdjustApply = () => {
  const [query, setQuery] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { result, loadMore, renderFooter } = usePagination(getPointOrderList);

  const renderItem = ({ type }) => {
    return (
      <Card actions={typeVal[type].btns}>
        <TouchableOpacity onPress={() => NavigationService.navigate('AdjustDetails', { type })}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>申请单号TZ202009160000018-1</Text>
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
      title="调价申请"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Search />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          onChange={(val) => setActiveTab(val)}
          itemStyle={{ paddingHorizontal: 0 }}
          style={{ flex: 1 }}
        />
        <View style={{ width: 1, height: 13, backgroundColor: '#EBEDF0', marginRight: 12 }} />
        <View style={{ paddingRight: 16 }}>
          <Filter values={query} fields={filterFields} onSubmit={setQuery} />
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ marginTop: 24, paddingHorizontal: 16 }}
        data={
          [
            { id: 1, type: 'audit' },
            { id: 2, type: 'invalid' },
            { id: 3, type: 'draft' },
          ] || result?.data
        }
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={({ item }) => renderItem(item)}
        ListFooterComponent={renderFooter}
      />
      <Footer actions={[{ children: '新建调价申请', onPress: () => NavigationService.navigate('NewAdjust') }]} />
    </BasePage>
  );
};

export default AdjustApply;
