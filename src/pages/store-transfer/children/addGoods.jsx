import React from 'react';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Footer from 'common/footer';
import SearchBar from 'common/search-bar';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'common/icon';
import Prcie from 'pages/store-order/widget/price';
import FlatList from 'common/flat-list';
import Card from '../widget/card';

const AddGoods = () => {
  const data = [
    { id: 1, type: 'audit' },
    { id: 2, type: 'invalid' },
    { id: 3, type: 'draft' },
  ];

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      title="添加商品"
      leftIconName="icon-back"
      onLeftClick={() => NavigationService.goBack()}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff' }}>
        <SearchBar placeholder="输入盘点计划单号/计划名称" onScan={() => {}} />
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon color="#333333" type="filter" size={14} />
            <Text
              style={{
                marginLeft: 2,
                fontSize: 12,
                color: '#333333',
              }}
            >
              筛选
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, overflow: 'hidden', padding: 16 }}>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => `${index}-${id}`}
          renderItem={({ item }) => <Card style={{ marginBottom: 12 }} item={item} />}
        />
      </View>

      <Footer
        style={{ marginTop: 'auto' }}
        actions={[
          {
            children: '暂存',
            type: 'default',
            onPress: () => {
              NavigationService.navigate('AddGoods');
            },
          },
          {
            children: '提交',
            onPress: () => {
              NavigationService.navigate('AddGoods');
            },
          },
        ]}
      >
        <Prcie
          size={17}
          footer={
            <Text style={{ fontSize: 10, marginRight: 12 }}>
              <Text style={{ fontSize: 10, color: '#999999', marginRight: 4 }}>品项数</Text>2
            </Text>
          }
        />
      </Footer>
    </BasePage>
  );
};

export default AddGoods;
