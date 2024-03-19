import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Tabs from 'common/tabs';
import Button from 'common/button';
import { Icon } from 'common/icon';
import { cloneDeep } from 'lodash';
import Price from '../widget/price';
import { getValue } from '../constants';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 700,
  },
  solid: {
    width: '100%',
    height: 1,
    backgroundColor: '#EBEDF0',
    marginVertical: 12,
  },
  row: { flexDirection: 'row', marginBottom: 6 },
  label: { width: 76, color: '#999999', fontSize: 12 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

const tabsConfig = [
  {
    key: 0,
    title: '商品概述',
    config: [
      {
        title: '商品信息',
        list: [
          { lable: '商品名称', value: '嘉士利果乐果香果酱夹心饼干草莓味93g' },
          { lable: '规格', value: '30g*240包' },
          { lable: '保质期', value: '360天' },
          { lable: '商品类型', value: '标准商品' },
          { lable: '换算率', value: '30' },
          { lable: '基本单位', value: '包' },
          { lable: '配送单位', value: '件' },
          { lable: '门店售价', value: '1.40/包' },
          { lable: '配送价', value: '¥42.00/件', style: { color: '#FF8800', fontWeight: 700 } },
        ],
      },
      {
        title: '销售/库存信息',
        list: [
          { lable: '当前库存', value: '0包' },
          { lable: '中心库存', value: '无货' },
          { lable: '今日销售', value: '标准商品' },
          { lable: '昨日销量', value: '30包' },
          { lable: '日平均', value: '0包' },
        ],
      },
      {
        title: '配送属性',
        list: [
          { lable: '订购上限', value: '10' },
          { lable: '订购下限', value: '0' },
          { lable: '订购基数', value: '1' },
          { lable: '推荐商品', value: '0包' },
          { lable: '不允许退货', value: '否' },
        ],
      },
    ],
  },
  {
    key: 1,
    title: '商品详情',
    config: [
      {
        title: '商品信息',
        unfold: true,
        list: [
          { lable: '商品代码', value: '100189' },
          { lable: '商品条码', value: '6936869215085' },
          { lable: '速记码', value: 'EWZYXLYW26G' },
        ],
      },
    ],
  },
  {
    key: 2,
    title: '商品数据',
    config: [],
  },
];

const ProductDetails = () => {
  const [tabs, setTabs] = useState(tabsConfig);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const activeValue = useMemo(() => {
    return getValue(activeTab, tabs);
  }, [activeTab, tabs]);

  const handleIcon = (elIndex) => {
    const val = cloneDeep(tabs).map((el) => {
      if (el.key === activeTab) {
        const el_ = { ...el };
        el_.config[elIndex].unfold = !el_.config[elIndex].unfold;
      }
      return el;
    });
    setTabs(val);
  };

  return (
    <BasePage
      style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
      leftIconName="icon-back"
      title="商品详情"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Tabs
        activeTab={activeTab}
        tabs={tabs}
        onChange={(val) => setActiveTab(val)}
        itemStyle={{ paddingHorizontal: 0 }}
        style={{ backgroundColor: '#fff' }}
      />
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, flex: 1, overflow: 'auto' }}>
        {activeTab === 0 ? (
          <View style={[styles.card, { paddingVertical: 16 }]}>
            <Image
              style={{ width: 148, height: 148, borderRadius: 6, marginLeft: 'auto', marginRight: 'auto' }}
              source="https://imgpub.chuangkit.com/designTemplate/2022/01/24/5c7408a5-00b8-4a8e-9733-49c4832e478b_thumb?v=1646065201000"
            />
          </View>
        ) : null}
        {activeValue.config.map((el, elIndex) => {
          return (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.title}>{el.title}</Text>
                {typeof el.unfold === 'boolean' ? (
                  <TouchableOpacity onPress={() => handleIcon(elIndex)}>
                    <Icon
                      style={el.unfold === false ? { transform: 'rotate(180deg)' } : {}}
                      size="xs"
                      color="#7D7E80"
                      type="icon-arrow-down"
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {el.unfold === false ? null : (
                <React.Fragment>
                  <View style={styles.solid} />
                  {el.list.map((item, index) => {
                    return (
                      <View style={[styles.row, index === el.list.length - 1 ? { marginBottom: 0 } : null]}>
                        <Text style={styles.label}>{item.lable}</Text>
                        <Text style={[{ fontSize: 12 }, item.style]}>{item.value}</Text>
                      </View>
                    );
                  })}
                </React.Fragment>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.footer}>
        <Price label="商品合计" />
        <Button type="primary">添加至购物车</Button>
      </View>
    </BasePage>
  );
};

export default ProductDetails;
