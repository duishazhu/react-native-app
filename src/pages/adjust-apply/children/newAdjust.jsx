import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Tabs from 'common/tabs';
import Field from 'common/field';
import Bottom from 'common/button';
import Footer from 'common/footer';
import FlatList from 'common/flat-list';
import { Icon } from 'common/icon';
import ListEmpty from '../widget/ListEmpty';
import GoodsCard from '../widget/goodsCard';

const tabs = [
  { key: 0, title: '基础信息' },
  { key: 1, title: '调价商品' },
  { key: 2, title: '调价门店' },
];

const NewAdjust = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);
  const [data, setData] = React.useState([
    { id: 1, type: 'audit' },
    { id: 2, type: 'invalid' },
    { id: 3, type: 'draft' },
  ]);
  const deleteCard = (item) => {
    const copyData = [...data].filter((el) => el.id !== item.id);
    setData(copyData);
  };

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      title="新建调价申请"
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
          <Field style={{ marginTop: 8 }} label="生效日期" type="datePicker" />
          <Field value="零售价" label="调价类型" type="input" customProps={{ disabled: true }} />
          <Field
            style={{ alignItems: 'flex-start' }}
            label="调价原因"
            type="textarea"
            customProps={{ placeholder: '请输入（限200字）', count: 200 }}
          />
        </React.Fragment>
      ) : null}
      {activeTab === tabs[1].key ? (
        <View style={{ paddingHorizontal: 16, marginTop: 16, flex: 1, overflow: 'auto' }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8 }}
          >
            <Text>调价商品(0)</Text>
            <Bottom size="small">选择商品</Bottom>
          </View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => `${index}-${id}`}
            renderItem={({ item }) => (
              <GoodsCard onPress={() => deleteCard(item)} style={{ marginBottom: 10 }} item={item} />
            )}
            ListFooterComponent={() => (data.length === 0 ? <ListEmpty /> : null)}
          />
        </View>
      ) : null}
      {activeTab === tabs[2].key ? (
        <View style={{ paddingHorizontal: 16, marginTop: 16, flex: 1, overflow: 'auto' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>调价门店(0)</Text>
            <Bottom size="small">选择门店</Bottom>
          </View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => `${index}-${id}`}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  marginTop: 12,
                  alignItems: 'center',
                }}
              >
                <Text>100020121{item.id}</Text>
                <Text style={{ marginLeft: 40 }}>马栏山门店</Text>
                <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => deleteCard(item)}>
                  <Icon type="icon-minus" size="xs" />
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => (data.length === 0 ? <ListEmpty text="暂无门店" /> : null)}
          />
        </View>
      ) : null}
      <Footer
        style={{ marginTop: 'auto' }}
        actions={[
          { children: '取消', type: 'default', onPress: () => {} },
          { children: '提交', disabled: true, onPress: () => {} },
        ]}
      />
    </BasePage>
  );
};

export default NewAdjust;
