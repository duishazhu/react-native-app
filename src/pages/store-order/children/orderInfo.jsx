import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Field from 'common/field';
import Tabs from 'common/tabs';
import Search from '../widget/search';
import Header from '../widget/header';
import Info from '../widget/info';
import Freight from '../widget/freight';
import Prcie from '../widget/price';

const tabs = [
  { key: 0, title: '订单信息' },
  { key: 1, title: '操作信息' },
];
const OrderInfo = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);

  return (
    <BasePage
      style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
      leftIconName="icon-back"
      title="订单信息"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Tabs
        activeTab={activeTab}
        tabs={tabs}
        onChange={(val) => setActiveTab(val)}
        itemStyle={{ paddingHorizontal: 0 }}
        style={{ backgroundColor: '#fff' }}
      />
      {activeTab === 0 ? (
        <React.Fragment>
          <Search />
          <Header />
          <Field
            type="input"
            label="单据备注"
            value="123123123"
            customProps={{ placeholder: '填写单据备注', disabled: true }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              marginTop: 8,
              marginBottom: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <View style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>商品清单</View>
            <Info />
          </View>
          <Freight />
          <View
            style={{
              height: 50,
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginTop: 'auto',
              paddingHorizontal: 16,
              backgroundColor: '#fff',
            }}
          >
            <Prcie
              prep={
                <Text style={{ fontSize: 10, marginRight: 12 }}>
                  <Text style={{ fontSize: 10, color: '#999999', marginRight: 4 }}>已优惠</Text>
                  ¥84
                </Text>
              }
              label="小计"
            />
          </View>
        </React.Fragment>
      ) : (
        <View style={{ paddingHorizontal: 16, paddingVertical: 12, marginTop: 10, backgroundColor: '#fff' }}>
          <View style={{ marginBottom: 20, flexDirection: 'row' }}>
            <Text style={{ width: 70, color: '#646566' }}>创建时间</Text>
            <Text>2023-10-13 19:26:20</Text>
          </View>
          <View style={{ marginBottom: 20, flexDirection: 'row' }}>
            <Text style={{ width: 70, color: '#646566' }}>审核人</Text>
            <Text>零小忙</Text>
          </View>
        </View>
      )}
    </BasePage>
  );
};

export default OrderInfo;
