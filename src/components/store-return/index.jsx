import React, { useState, useCallback } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { Loading } from '@terminus/nusi-mobile';
import { useOnShow } from '@terminus/octopus-core';
import BasePage from 'common/base-page';
import SearchBar from 'common/search-bar';
import Filter from 'common/filter';
import FlatList from 'common/flat-list';
import Card from 'common/card';
import CardPanel from 'common/card/panel';
import Tag from 'common/tag';
import usePagination from 'hooks/usePagination';
import { orderStatusMap, returnTypeMap, filterFields } from 'store-return/constants';
import { getPointOrderList } from 'store-return/services';
import styles from 'store-return/style';
import Footer from 'common/footer';

const emptyButtonStyle = { borderColor: '#D6D8DD', borderWidth: 1 };

export default function StoreReturn() {
  const [keyword, setKeyword] = useState();
  const [query, setQuery] = useState({
    orderStatus: '',
    returnType:'',
  });
  const { result, loading, loadMore, renderFooter, setArgs } = usePagination(getPointOrderList);
  // eslint-disable-next-line
  result?.data = [{
    title:'TZ20202020000018',
    orderStatus: 'UNPAID',
    type: 'SECKILL',
    num: 2,
    person: '阿斯达四大',
    time: '20240122 08:25',
    mount:1000,
  }]

  const handleDetail = useCallback((orderId) => NavigationService.navigate('StoreReturnDetail', { orderId }), []);

  useOnShow(
    useCallback(() => {
      setArgs((prev) => ({
        ...prev,
        pageNo: 1,
        keyword,
        ...query,
      }));
    }, [keyword, query, setArgs])
  );

  const createReturnOrder = useCallback(async () => {}, []);

  const panelFields = useCallback((item) => {
    return [
      {
        value: returnTypeMap[item.type],
        label: '退货类型',
      },
      {
        value: item.num,
        label: '包裹数量',
      },
      {
        value: `${item.person} ${item.time}`,
        label: '制单人',
      },
      {
        value: item.mount,
        label: '预计退款',
      },
    ];
  }, []);

  const cardAction = useCallback(() => {
    return [
    { children: '删除', type: '', styles: emptyButtonStyle },
    { children: '继续编辑', type: '', styles: emptyButtonStyle },
    { children: '提交' },
    // { children: '去审核', onPress: () => handleDetail(item.id) },
    // { children: '查看箱码',type:'', onPress: () => handleDetail(item.id) }
  ];
  }, [])

  const renderItem = useCallback(
    ({ item }) => {
      const orderStatus = orderStatusMap[item.orderStatus];
      return (
        <Card actions={cardAction(item)} style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => handleDetail(item.id)}
          >
          <View style={styles.cardHeader}>
            <Text style={styles.storeText}>退货单{item.title}</Text>
            <Tag type={orderStatus.type}>{orderStatus.label}</Tag>
          </View>
          <View style={styles.cardContent}>
            <CardPanel labelWidth={68} fields={panelFields(item)} style={styles.panel} />
            </View>
            </TouchableOpacity>
        </Card>
      );
    },
    [cardAction, panelFields,handleDetail]
  );

  return (
    <BasePage forceInset={{ bottom: 'never' }} title="门店退货">
      <Loading visible={loading} toast />
      <View style={styles.titleSearch}>
        <SearchBar placeholder="输入单号、制单人查询" onSubmit={setKeyword} isShowStore style={{ flex: 1 }} />
        <Filter values={query} fields={filterFields} onSubmit={setQuery} />
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
      <Footer actions={[{ children: '新建退货单', onPress: createReturnOrder }]} />
    </BasePage>
  );
}
