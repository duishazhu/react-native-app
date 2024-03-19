import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Platform } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { Loading } from '@terminus/nusi-mobile';
import { useQuery } from '@terminus/octopus-core';
import BasePage from 'common/base-page/order-detail';
import Button from 'common/button';
import Card from 'common/card';
import ProductBase from 'common/product/base';
import FieldDisplay from 'common/field/display';
import Tag from 'common/tag';
import { mobileWithSecret } from 'common/helper';
import useRequest from 'hooks/useRequest';
import { orderStatusMap, campaignTagMap } from 'point-order/constants';
import { getPointOrderDetailByFunc, pickUpOrder } from 'point-order/services';
import { detailStyles as styles } from 'point-order/style';
import { Empty } from 'common/empty';
import emptyImg from 'images/common/empty.png';

export default function PointOrderDetail() {
  const { orderId, selfPickCode } = useQuery();

  const { result, loading, executor } = useRequest(() => getPointOrderDetailByFunc({ orderId, selfPickCode }));
  const { loading: pickUpLoading, executor: pickUpExecutor } = useRequest(pickUpOrder, { immediate: false });
  const isOrderClose = result?.orderStatus === 'CLOSED';
  const isCouponExchange = result?.exchangeType === 'COUPON_EXCHANGE';

  const handlePickUp = useCallback(async () => {
    await pickUpExecutor({ orderCode: result.orderCode, storeId: result.selfPickStoreId || 1 });
    executor();
  }, [executor, pickUpExecutor, result]);

  const emptyContent = useMemo(
    () =>
      !loading ? <Empty imgOpt={{ img: emptyImg, width: 119, height: 87 }} emptyLabel="没有找到相应的订单" /> : null,
    [loading]
  );

  // const handleScan = useCallback((code) => NavigationService.navigate('PointOrderDetail', { selfPickCode: code }), []);
  const handleScan = useCallback((code) => NavigationService.replace('PointOrderDetail', { selfPickCode: code }), []);

  const handleWriteOffPress = useCallback(() => {
    Platform.API.scanCode({
      scanType: ['barCode', 'qrCode'],
      success: ({ result: code }) => handleScan(code),
    });
  }, [handleScan]);

  return (
    <BasePage title="订单详情">
      <Loading visible={loading || pickUpLoading} toast />
      {result ? (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.mainInfo}>
              <Text style={styles.orderCode}>订单{result.orderCode}</Text>
              <Tag type={orderStatusMap[result.orderStatus].type}>{orderStatusMap[result.orderStatus].label}</Tag>
            </View>
            {isOrderClose ? (
              <Text style={[styles.subInfo, styles.subInfoHighlight, { color: 'rgba(238, 10, 36, 1)' }]}>
                {result.cancelReason}
              </Text>
            ) : null}
            {isCouponExchange ? null : (
              <Text style={styles.subInfo}>
                自提门店：
                <Text style={styles.subInfoHighlight}>{result.selfPickStoreName}</Text> | 自提地址：
                <Text style={styles.subInfoHighlight}>{result.storeAddress}</Text>
              </Text>
            )}
            <View style={styles.productContainer}>
              {result.onlineOrderLineList?.map((orderLine) => (
                <ProductBase
                  key={orderLine.id}
                  imageUrl={orderLine.itemMainImage}
                  imageExtra={
                    result.campaignTag !== 'NONE' && (
                      <View style={styles.campaignTag}>
                        <Text style={styles.campaignTagText}>{campaignTagMap[result.campaignTag]}</Text>
                      </View>
                    )
                  }
                  title={orderLine.itemName}
                  titleExtra={
                    <Text style={styles.linePoint}>
                      <Text style={styles.linePointNum}>{orderLine.paidAmount}</Text>
                      积分
                    </Text>
                  }
                  subInfoList={[
                    {
                      text: `单价 ${orderLine.points}积分/${orderLine.itemMeasureUnit}`,
                      extra: `x${orderLine.quantity}`,
                    },
                  ]}
                />
              ))}
            </View>
            <Card title="会员信息">
              <FieldDisplay label="会员昵称" labelWidth={88} value={result.memberName} />
              <FieldDisplay label="会员手机号" labelWidth={88} value={mobileWithSecret(result.memberMobile)} />
              <FieldDisplay label="本次交易积分" labelWidth={88} value={result.paidAmount} />
            </Card>
            <Card title="订单信息">
              <FieldDisplay label="订单编号" labelWidth={88} value={result.orderCode} />
              <FieldDisplay label="下单时间" labelWidth={88} value={result.orderTime} />
              {!!result.finishedTime && <FieldDisplay label="完成时间" labelWidth={88} value={result.finishedTime} />}
            </Card>
          </ScrollView>
          {result.orderStatus === 'WAITING_SELF_PICK' && selfPickCode && (
            <View style={styles.footer}>
              <Button style={styles.action} full type="primary" size="large" onPress={handlePickUp}>
                确认核销
              </Button>
              <Button style={styles.action} full size="large" onPress={() => NavigationService.pop()}>
                取消核销
              </Button>
            </View>
          )}
          {result.orderStatus === 'WAITING_SELF_PICK' && !selfPickCode && (
            <TouchableWithoutFeedback onPress={handleWriteOffPress}>
              <View style={styles.writeOffButton}>
                <Text style={styles.writeOffButtonText}>自提</Text>
                <Text style={styles.writeOffButtonText}>核销</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </>
      ) : (
        emptyContent
      )}
    </BasePage>
  );
}
