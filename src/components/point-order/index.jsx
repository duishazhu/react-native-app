import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { Loading } from '@terminus/nusi-mobile';
import { useOnShow } from '@terminus/octopus-core';
import BasePage from 'common/base-page';
import SearchBar from 'common/search-bar';
import Filter from 'common/filter';
import FlatList from 'common/flat-list';
import Card from 'common/card';
import ProductBase from 'common/product/base';
import Tag from 'common/tag';
import SelectButton from 'common/button/select';
import useStoreInfo from 'hooks/useStoreInfo';
import useStoreSelect from 'hooks/useStoreSelect';
import usePagination from 'hooks/usePagination';
import { orderStatusMap, campaignTagMap, filterFields, exchangeTypeMap } from 'point-order/constants';
import { getPointOrderList } from 'point-order/services';
import styles from 'point-order/style';
import dayjs from 'dayjs';
// import { formatDate } from 'common/helper'

export default function PointOrder() {
  const { storeInfo } = useStoreInfo();
  const { selected, dispatchSelect } = useStoreSelect({ multiple: true });

  const selectedStoreList = useMemo(() => {
    if (selected?.length) {
      return selected;
    }
    if (storeInfo?.id) {
      return [storeInfo];
    }
    return [];
  }, [selected, storeInfo]);

  const [keyword, setKeyword] = useState();
  const [query, setQuery] = useState();

  const { result, loading, loadMore, renderFooter, setArgs } = usePagination(getPointOrderList);

  const handleDetail = useCallback((orderId) => NavigationService.navigate('PointOrderDetail', { orderId }), []);

  const handleScan = useCallback(
    (selfPickCode) => NavigationService.navigate('PointOrderDetail', { selfPickCode }),
    []
  );

  const handleWriteOffPress = useCallback(() => {
    Platform.API.scanCode({
      scanType: ['barCode', 'qrCode'],
      success: ({ result: selfPickCode }) => handleScan(selfPickCode),
    });
  }, [handleScan]);

  useOnShow(
    useCallback(() => {
      setArgs((prev) => ({
        ...prev,
        pageNo: 1,
        searchVal: keyword,
        storeIdList: selectedStoreList.map(({ id }) => id),
        ...query,
      }));
    }, [keyword, query, selectedStoreList, setArgs])
  );

  const renderItem = useCallback(
    ({ item }) => {
      const orderStatus = orderStatusMap[item.orderStatus];
      const totalQuantity = item.onlineOrderLineDTOList.reduce((current, { quantity }) => current + quantity, 0);
      return (
        <Card actions={[{ children: '详情', onPress: () => handleDetail(item.id) }]}>
          <View style={styles.cardHeader}>
            <Tag type="warning">{exchangeTypeMap[item.exchangeType]}</Tag>
            <Text style={styles.storeText}>{item.selfPickStoreName}</Text>
            <Tag type={orderStatus.type}>{orderStatus.label}</Tag>
          </View>
          {item.onlineOrderLineDTOList.map((orderLine) => (
            <ProductBase
              key={orderLine.id}
              imageUrl={orderLine.itemMainImage}
              imageSize={64}
              imageExtra={
                item.campaignTag !== 'NONE' && (
                  <View style={styles.campaignTag}>
                    <Text style={styles.campaignTagText}>{campaignTagMap[item.campaignTag]}</Text>
                  </View>
                )
              }
              title={orderLine.itemName}
              titleExtra={<Text style={styles.linePoint}>{orderLine.paidAmount}积分</Text>}
              subInfoList={[
                { text: `单价 ${orderLine.points}积分/${orderLine.itemMeasureUnit}`, extra: `x${orderLine.quantity}` },
              ]}
            />
          ))}
          <View style={styles.orderSummaryInfo}>
            <Text style={styles.orderTime}>{dayjs(item.orderTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Text style={styles.orderSummary}>
              共{totalQuantity}件 实付{item.paidAmount}积分
            </Text>
          </View>
        </Card>
      );
    },
    [handleDetail]
  );

  const listHeaderComponent = useMemo(
    () => (
      <View style={styles.filterContainer}>
        <SelectButton
          onPress={dispatchSelect}
          textProps={{ numberOfLines: 1, ellipsizeMode: 'tail' }}
          textStyle={{ maxWidth: 285 }}
        >
          {selectedStoreList.map(({ name }) => name).join('; ') || '门店'}
        </SelectButton>
        <Filter values={query} fields={filterFields} onSubmit={setQuery} />
      </View>
    ),
    [dispatchSelect, query, selectedStoreList]
  );

  return (
    <BasePage forceInset={{ bottom: 'never' }} title="积分订单">
      <Loading visible={loading} toast />
      <SearchBar placeholder="输入订单编号/会员手机号" onSubmit={setKeyword} />
      <FlatList
        contentContainerStyle={styles.container}
        data={result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={renderFooter}
      />
      <TouchableWithoutFeedback onPress={handleWriteOffPress}>
        <View style={styles.writeOffButton}>
          <Text style={styles.writeOffButtonText}>自提</Text>
          <Text style={styles.writeOffButtonText}>核销</Text>
        </View>
      </TouchableWithoutFeedback>
    </BasePage>
  );
}
