import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
// import { NavigationService } from '@terminus/react-navigation';
// import { Loading } from '@terminus/nusi-mobile';
// import { useQuery } from '@terminus/octopus-core';
import BasePage from 'common/base-page/order-detail';
// import Button from 'common/button';
import Card from 'common/card';
import ProductBase from 'common/product/base';
import FieldDisplay from 'common/field/display';
import Tag from 'common/tag';
// import useRequest from 'hooks/useRequest';
import { orderStatusMap } from 'store-return/constants';
// import { pickUpOrder } from 'store-return/services';
import { detailStyles as styles } from 'store-return/style';
import FormatFee from 'common/format-fee';
import ExpandBar from 'common/expand-bar';

import Tabs from 'common/tabs';

const tabs = [
  { key: 'order', title: '订单信息' },
  { key: 'control', title: '操作信息' },
];
export default function PointOrderDetail() {
  // const { orderId } = useQuery();
  const [activeTab, setActiveTab] = useState('order');

  // const { result, loading, executor } = useRequest(() => getPointOrderDetail(orderId));

  // const handlePickUp = useCallback(async () => {
  //   await pickUpExecutor({ orderCode: result.orderCode, storeId: result.selfPickStoreId || 1 });
  //   executor();
  // }, [executor, pickUpExecutor, result]);
  const result = {
    orderId: '202020202020202020',
    storeName: '盛世华中',
    storeCode: 'A456567678',
    orderStatus: 'UNPAID',
    returnType: '',
    reason: '质量原因',
    orderItem: 9,
    orderNum: 90,
    expectedAmount: 5670,
    remark: '这是一段这是一段这是一段这是一段这是一段这是一段备注原因',
    orderDetails: [
      {
        title: '1201-34-10',
        quantity: 6,
        num: 5,
        totalPrice: 1890,
        goodsList: [
          {
            goodsTitle: '乐视薯片麻辣味',
            price: '656',
            guigeNum: 30,
            guigeUnit: 'g',
            guige: 240,
            tiaoma: '958796876',
            code: '958796876',
            num: 10,
            id: 1,
            unit: '箱',
          },
          {
            goodsTitle: '乐视薯片麻辣味',
            price: '656',
            guigeNum: 30,
            guigeUnit: 'g',
            guige: 240,
            tiaoma: '958796876',
            code: '958796876',
            num: 10,
            id: 1,
            unit: '箱',
          },
        ],
      },
      {
        title: '1201-34-10',
        quantity: 6,
        num: 5,
        totalPrice: 1890,
        goodsList: [
          {
            goodsTitle: '乐视薯片麻辣味',
            price: '656',
            guigeNum: 30,
            guigeUnit: 'g',
            guige: 240,
            tiaoma: '958796876',
            code: '958796876',
            num: 10,
            id: 1,
            unit: '箱',
          },
        ],
      },
    ],
  };
  return (
    <BasePage title="退货单详情">
      {/* <Loading visible={loading || pickUpLoading} toast /> */}
      <Tabs
        scroll
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        style={styles.tabs}
        activeTabLineStyle={styles.activeTabLine}
      />
      {!!result && (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.mainInfo}>
              <View>
                <Text style={styles.orderCode}>退货单{result.orderId}</Text>
                <FieldDisplay label="所属门店：" labelWidth={60} value={result.storeName} />
              </View>
              <Tag type={orderStatusMap[result.orderStatus].type}>{orderStatusMap[result.orderStatus].label}</Tag>
            </View>
            {result?.orderDetails?.map((item) => {
              return (
                <View style={styles.expandItem}>
                  <ExpandBar title={item.title} titleStyle={styles.titleStyle}>
                    {item.goodsList.map((goods) => {
                      return (
                        <ProductBase
                          key={goods.id}
                          title={goods.goodsTitle}
                          imageVisible={false}
                          titleExtra={<FormatFee fee={goods.price} color="#333333" />}
                          subInfoListStyle={{ flexDirection: 'column' }}
                          subInfoExtraTextStyle={{ color: '#333333' }}
                          style={styles.expandContent}
                          subInfoList={[
                            {
                              text: `规格: ${goods.guigeNum}${goods.guigeUnit}*${goods.guige}`,
                            },
                            {
                              text: `条码: ${goods.tiaoma}`,
                            },
                            {
                              text: `编码: ${goods.code}`,
                            },
                            {
                              text: (
                                <FormatFee
                                  fee={goods.price}
                                  showUnit
                                  unit={goods.unit}
                                  color="#333333"
                                  unitColor="#333333"
                                  size={12}
                                  noUnitLeftMargin={0}
                                  fontWeight="normal"
                                />
                              ),
                              extra: `x${goods.num}`,
                            },
                          ]}
                        />
                      );
                    })}
                  </ExpandBar>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 16,
                      borderTopWidth: 1,
                      borderTopColor: '#EBEDF0',
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <FieldDisplay label="品项" labelWidth={28} value={item.quantity} />
                      <FieldDisplay label="数量" labelWidth={28} value={item.num} style={{ marginLeft: 8 }} />
                    </View>
                    <FieldDisplay
                      label="合计"
                      labelWidth={28}
                      value={<FormatFee fee={item.totalPrice} color="#FF8800" />}
                    />
                  </View>
                </View>
              );
            })}

            <Card title="其他信息">
              <FieldDisplay label="退货类型" labelWidth={88} value={result.returnType} />
              <FieldDisplay label="退货原因" labelWidth={88} value={result.reason} />
              <FieldDisplay label="品项" labelWidth={88} value={result.orderItem} />
              <FieldDisplay label="数量" labelWidth={88} value={result.orderNum} />
              <FieldDisplay
                label="预计退款"
                labelWidth={88}
                value={<FormatFee fee={result.expectedAmount} color="#FF8800" size={12} />}
              />
              <FieldDisplay label="单据备注" labelWidth={88} value={result.remark} />
            </Card>
          </ScrollView>
        </>
      )}
    </BasePage>
  );
}
