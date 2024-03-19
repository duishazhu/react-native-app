import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import { useQuery } from '@terminus/octopus-hooks';
import { Icon } from 'common/icon';
import Button from 'common/button';
import Filter from 'common/filter';
import { Tabs, Badge } from '@terminus/nusi-mobile';
import Search from '../widget/search';
import Footer from '../widget/footer';

const filterFields = [
  {
    title: '商品查询',
    name: 'createTimeRange',
    type: 'listRadio',
    customProps: {
      options: [
        { label: '过滤中心无库存商品', value: false },
        { label: '仅查看门店无库存商品 ', value: false },
      ],
    },
  },
];
const tabOptions = [
  {
    title: '一级分类',
  },
  {
    title: '选中分类',
    value: 8,
  },
  {
    title: 'Third Tab',
  },
  {
    title: 'Forth Tab',
  },
  {
    title: 'fifth Tab',
  },
  {
    title: 'Sixth Tab',
  },
  {
    title: 'Seventh Tab',
  },
];

const Confirmation = () => {
  const { title } = useQuery();
  const [query, setQuery] = useState();
  const [tabIndex, setTabIndex] = useState(1);

  const handleRenderTab = ({ tab, page, current }) => {
    const active = page === current;
    return (
      <TouchableOpacity
        style={[
          { height: 60, backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center' },
          active ? { backgroundColor: '#fff' } : {},
        ]}
        onPress={() => setTabIndex(page)}
        key={page}
      >
        <Badge
          text={tab.value}
          containerStyle={{ backgroundColor: '#FFE423' }}
          textStyle={{ backgroundColor: '#FFE423' }}
        >
          <Text style={[{ color: '#7D7E80' }, active ? { color: '#323233', fontWeight: 600 } : {}]}>{tab.title}</Text>
        </Badge>
      </TouchableOpacity>
    );
  };

  return (
    <BasePage
      style={{ backgroundColor: '#F5F5F5' }}
      leftIconName="icon-back"
      title={title}
      onLeftClick={() => NavigationService.goBack()}
    >
      <Search
        rowStyle={{ marginRight: 14 }}
        rightExtra={<Filter values={query} fields={filterFields} onSubmit={setQuery} />}
        inputExtra={<Icon size={16} color="#333333" type="icon-arrow-right" />}
      />
      <View style={{ flex: 1 }}>
        <Tabs
          type="tabs"
          direction="vertical"
          initialPage={1}
          renderTab={handleRenderTab}
          page={tabIndex}
          style={{ height: '100%', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F2F3F5' }}
          tabs={tabOptions}
          tabsBarStyle={{ backgroundColor: '#F2F3F5' }}
        >
          {tabOptions.map((item, index) => (
            <View style={{ height: '100%' }} key={`tab1_${index}`}>
              <Text>{`${item.title}-${index + 1}`}</Text>
              <Text onPress={() => NavigationService.navigate('ProductDetails')}>跳转商品详情</Text>
              <Text onPress={() => NavigationService.navigate('OrderConfirm')}>跳转确认订单</Text>
              <Text onPress={() => NavigationService.navigate('ViewDelivery')}>跳转查看配送</Text>
            </View>
          ))}
        </Tabs>
      </View>
      <Footer values={{ num: 1, item: 1 }} btns={[<Button type="primary">下一步</Button>]} />
    </BasePage>
  );
};

export default Confirmation;
