import React, { useState, useMemo } from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import greenBg from 'images/store-order/green.png';
import pinkBg from 'images/store-order/pink.png';
import yellowBg from 'images/store-order/yellow.png';
import { createStyle } from 'styles/theme';
import FlatList from 'common/flat-list';
import usePagination from 'hooks/usePagination';
import { getPointOrderList } from 'point-order/services';
import Filter from 'common/filter';
import Tabs from 'common/tabs';
import Card from 'common/card';
import Tag from 'common/tag';
import Button from 'common/button';
import { filterFields, tabs, getValue } from './constants';
import CustomModal from './widget/custom-modal';
import Cell from './widget/cell';

const styles = createStyle({
  headerBg: {
    width: 108,
    height: 60,
    paddingTop: 4,
    paddingLeft: 8,
  },
  headerText: {
    fontWeight: 700,
    fontSize: 12,
  },
});

const TopBtnList = [
  { label: '常规要货', source: yellowBg },
  { label: '专题订货', source: greenBg },
  { label: '紧急要货', source: pinkBg },
];

const StoreOrder = () => {
  const { result, loadMore, renderFooter } = usePagination(getPointOrderList);
  const [query, setQuery] = useState();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [visibsle, setVisible] = useState(false);
  const activeValue = useMemo(() => {
    return getValue(activeTab);
  }, [activeTab]);

  const renderItem = () => {
    const getBtn = () => {
      if (activeTab === 1) {
        return (
          <Button
            onPress={() => NavigationService.navigate('ViewDelivery')}
            style={{ marginLeft: 'auto', paddingLeft: 10, paddingRight: 10 }}
            type="primary"
            size="small"
          >
            去审核
          </Button>
        );
      }
      if (activeTab === 2) {
        return (
          <Button
            onPress={() => setVisible(true)}
            style={{ marginLeft: 'auto', paddingLeft: 10, paddingRight: 10 }}
            type="primary"
            size="small"
          >
            去支付
          </Button>
        );
      }
      return null;
    };

    const getExtendBtn = (val) => {
      if (val === '重新生成要货单') {
        return <Button size="small">重新生成要货单</Button>;
      }
      return null;
    };

    return (
      <Card actions={activeValue.btns}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 500 }}>申请单号TZ202009160000018-1</Text>
            <Tag type={activeValue.tagType || 'info'}>{activeValue.title}</Tag>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Text style={{ fontSize: 12, color: '#666666' }}>专题要货-圣诞节专题</Text>
            {activeTab === 2 ? (
              <Text style={{ fontSize: 12, color: '#EE0A24', marginLeft: 8 }}>等待支付,剩余10:20</Text>
            ) : null}
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
        {activeTab === 1 || activeTab === 2 ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 14, color: '#666666' }}>共2单</Text>
            <Text style={{ fontSize: 14, color: '#333', fontWeight: 700, marginLeft: 8 }}>2000.00元</Text>
            {getBtn()}
          </View>
        ) : null}
        <View
          style={
            activeTab === 1 || activeTab === 2
              ? { marginTop: 12, backgroundColor: '#F7F7F7', borderRadius: 6, padding: 8 }
              : {}
          }
        >
          {activeValue.rows.map((el) => {
            if (el.extendBtn) {
              return (
                <View
                  style={[
                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                    el.wrapStyle,
                  ]}
                >
                  <Cell label={el.label} value={el.value} />
                  {getExtendBtn(el.extendBtn)}
                </View>
              );
            }
            return <Cell label={el.label} value={el.value} style={el.style} wrapStyle={el.wrapStyle} />;
          })}
        </View>
      </Card>
    );
  };

  const listHeaderComponent = () => {
    return (
      <React.Fragment>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>我的订单</Text>
          <Filter values={query} fields={filterFields} onSubmit={setQuery} />
        </View>
        <Tabs
          activeTab={activeTab}
          tabs={tabs}
          onChange={(val) => setActiveTab(val)}
          itemStyle={{ paddingHorizontal: 0 }}
          style={{ marginBottom: 12 }}
        />
      </React.Fragment>
    );
  };

  const TopBtn = ({ source, label, onPress }) => {
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <ImageBackground style={styles.headerBg} source={source}>
          <Text style={styles.headerText}>{label}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <BasePage
      headerStyle={{ backgroundColor: '#FAFAFA' }}
      style={{ backgroundColor: '#FAFAFA', paddingHorizontal: 16 }}
      leftIconName="icon-back"
      title="门店订货"
      onLeftClick={() => NavigationService.goBack()}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        {TopBtnList.map((el) => {
          return (
            <TopBtn
              source={el.source}
              label={el.label}
              onPress={() => NavigationService.navigate('OrderCycle', { title: el.label })}
            />
          );
        })}
      </View>
      <FlatList
        contentContainerStyle={{ marginTop: 24 }}
        data={[{ id: 1 }, { id: 2 }] || result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={renderFooter}
      />
      <CustomModal
        title="要货单YHD45242100542150"
        show={visibsle}
        isSolid
        onCancel={() => setVisible(false)}
        wrapStyle={{ paddingHorizontal: 0 }}
        pressText="确认"
        onPress={() => NavigationService.navigate('OrderPay')}
      >
        <Text
          style={{
            height: 32,
            backgroundColor: '#FFFBE8',
            color: '#FF8800',
            textAlign: 'center',
            lineHeight: 32,
            fontSize: 13,
          }}
        >
          确认后，当日要货商品将不再合并至该要货单中
        </Text>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          {[1, 2].map(() => {
            return (
              <View
                style={[
                  {
                    backgroundColor: '#F7F7F7',
                    borderRadius: 6,
                    padding: 8,
                    marginBottom: 8,
                  },
                ]}
              >
                {tabs[1].rows.map((el) => {
                  return <Cell label={el.label} value={el.value} style={el.style} wrapStyle={el.wrapStyle} />;
                })}
              </View>
            );
          })}
        </View>
      </CustomModal>
    </BasePage>
  );
};

export default StoreOrder;
