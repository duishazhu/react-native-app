import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Tabs from 'common/tabs';
import Card from 'common/card';
import { useQuery } from '@terminus/octopus-hooks';
import Tag from 'common/tag';
import Cell from 'pages/store-order/widget/cell';
import Footer from 'common/footer';
import FlatList from 'common/flat-list';
import { typeVal } from '../constants';
import GoodsCard from '../widget/goodsCard';

const tabs = [
  { key: 0, title: '基础信息' },
  { key: 1, title: '调价商品' },
  { key: 2, title: '调价门店' },
];
const rows = [
  { label: '门店名称', value: '人民东路店' },
  { label: '调价商品', value: '20' },
  { label: '调价类型', value: '零售价' },
  { label: '生效时间', value: '2023-05-01 10:00:00' },
  { label: '创建人', value: '0092王丽' },
  { label: '创建时间', value: '2023-05-01  10:12:18' },
];

const NewAdjust = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);
  const { type } = useQuery();
  const data = [
    { id: 1, type: 'audit' },
    { id: 2, type: 'invalid' },
    { id: 3, type: 'draft' },
  ];

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      title="调价申请详情"
      leftIconName="icon-back"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Tabs
        activeTab={activeTab}
        tabs={tabs}
        onChange={(val) => setActiveTab(val)}
        itemStyle={{ paddingHorizontal: 0 }}
      />
      {activeTab === tabs[0].key ? (
        <React.Fragment>
          <Card style={{ marginTop: 12 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}
            >
              <Text style={{ fontSize: 16, fontWeight: 500 }}>申请单号TZ202009160000018-1</Text>
              <Tag type={typeVal[type].tagType}>{typeVal[type].tagValue}</Tag>
            </View>
            {rows.map((el) => {
              return <Cell label={el.label} value={el.value} />;
            })}
          </Card>
        </React.Fragment>
      ) : null}
      {activeTab === tabs[1].key ? (
        <View style={{ paddingHorizontal: 16, marginTop: 16, flex: 1, overflow: 'auto', backgroundColor: '#fff' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 8,
              paddingTop: 12,
            }}
          >
            <Text style={{ fontWeight: 700 }}>调价商品(10)</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => `${index}-${id}`}
            renderItem={({ item }) => <GoodsCard isDisable item={item} />}
          />
        </View>
      ) : null}
      {activeTab === tabs[2].key ? (
        <View style={{ paddingHorizontal: 16, marginTop: 16, flex: 1, overflow: 'auto', backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }}>
            <Text style={{ fontWeight: 700 }}>调价门店(10)</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => `${index}-${id}`}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 16,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  marginTop: 12,
                  alignItems: 'center',
                  borderBottomColor: '#EBEDF0',
                  borderBottomWidth: 1,
                }}
              >
                <Text>100020121{item.id}</Text>
                <Text style={{ marginLeft: 40 }}>马栏山门店</Text>
              </View>
            )}
          />
        </View>
      ) : null}
      <Footer
        style={{ marginTop: 'auto' }}
        actions={[
          { children: '取消', type: 'default', onPress: () => {} },
          { children: '提交', onPress: () => {} },
        ]}
      />
    </BasePage>
  );
};

export default NewAdjust;
