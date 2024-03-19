/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Loading, Checkbox } from '@terminus/nusi-mobile';
import BasePage from 'common/base-page';
import Card from 'common/card';
import CardPanel from 'common/card/panel';
import Filter from 'common/filter';
import FlatList from 'common/flat-list';
import Footer from 'common/footer';
import SearchBar from 'common/search-bar';
import Tag from 'common/tag';
import { usePagination } from 'hooks';
import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useOnShow } from '@terminus/octopus-core';
import styles from 'store-transfer/style';
import { NavigationService } from '@terminus/react-navigation';
import CustomModal from 'pages/store-order/widget/custom-modal';
import Field from 'common/field';
import {
  TransferOrderStatusDict,
  TransferOrderStatusDictText,
  TransferOrderTypeDict,
  TransferOrderTypeDictText,
  filterFields,
} from './constants';
import { pagingTransferOrderList } from './service';

const StoreTransfer = () => {
  const { result, loading, loadMore, renderFooter, setArgs } = usePagination(pagingTransferOrderList);

  const [keyword, setKeyword] = useState();
  const [visibsle, setVisibsle] = useState(false);
  const [checked, setChecked] = useState(true);
  const [query, setQuery] = useState({});

  const getActions = useCallback((item) => {
    const status = item?.transferOrderStatus || '';
    switch (status) {
      case TransferOrderStatusDict.WaitingSubmit:
        return [
          { children: '删除', type: 'default' },
          { children: '编辑', type: 'default' },
        ];
      case TransferOrderStatusDict.WaitingAudit:
        return [{ children: '删除', type: 'default' }, { children: '审核' }];
      case TransferOrderStatusDict.WaitingReceive:
        return [
          { children: '删除', type: 'default' },
          { children: '接收', onPress: () => setVisibsle(true) },
        ];
      default:
        return [];
    }
  }, []);

  const getStatusTagType = useCallback((item) => {
    const status = item?.transferOrderStatus;
    if (status === TransferOrderStatusDict.Done) {
      return 'success';
    }
    if (status === TransferOrderStatusDict.Canceled) {
      return 'disabled';
    }
    return 'info';
  }, []);

  const panelFields = useCallback((item) => {
    return [
      {
        value: item.initiateStoreName,
        label: '发起门店',
      },
      {
        value: item.transferOutStoreName,
        label: '调出门店',
      },
      {
        value: item.transferInStoreName,
        label: '调入门店',
      },
      {
        value: item.createdAt,
        label: '调拨时间',
      },
      {
        value: <Text>{item.transferAmount}</Text>,
        label: '调拨金额',
      },
    ];
  }, []);
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Card actions={getActions(item)}>
          <TouchableOpacity onPress={() => NavigationService.navigate('TransferDetails')}>
            <>
              <View style={styles.cardHeader}>
                <Tag type={item.transferOrderType === TransferOrderTypeDict.TransferIn ? 'warning' : 'info'}>
                  {TransferOrderTypeDictText[item.transferOrderType]}
                </Tag>
                <Text style={styles.orderTitle}>{item.transferOrderCode}</Text>
                <Tag type={getStatusTagType(item)}>{TransferOrderStatusDictText[item.transferOrderStatus]}</Tag>
              </View>
              <View style={styles.cardContent}>
                <CardPanel labelWidth={68} fields={panelFields(item)} style={styles.panel} />
              </View>
            </>
          </TouchableOpacity>
        </Card>
      );
    },
    [getActions, panelFields]
  );

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

  return (
    <BasePage title="门店调拨">
      <Loading visible={loading} toast />
      <View style={styles.titleSearch}>
        {/* @ts-ignore */}
        <SearchBar placeholder="输入单号、制单人查询" onSubmit={setKeyword} isShowStore style={{ flex: 1 }} />
        {/* @ts-ignore */}
        <Filter values={query} fields={filterFields} onSubmit={setQuery} />
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={styles.container}
        data={result?.data}
        keyExtractor={({ id }, index) => `${index}-${id}`}
        onEndReachedThreshold={0.2}
        onEndReached={loadMore}
        renderItem={renderItem}
        // @ts-ignore
        ListFooterComponent={renderFooter}
      />
      <Footer
        actions={[
          {
            children: '新建调拨单',
            onPress: () => {
              NavigationService.navigate('NewTransfer');
            },
          },
        ]}
      />
      {/* @ts-ignore */}
      <CustomModal
        title="是否确认接收"
        show={visibsle}
        isSolid
        onCancel={() => setVisibsle(false)}
        wrapStyle={{ paddingHorizontal: 0 }}
        pressText="提交"
      >
        <View style={styles.modalText}>接收调拨将会增加（调入）或扣减（调出）库存！</View>
        <View style={styles.radioWrap}>
          <Text style={{ color: '#969799' }}>是否接收</Text>
          {/* @ts-ignore */}
          <Checkbox style={{ marginLeft: 20 }} checked={checked} onChange={() => setChecked(!checked)}>
            接收
          </Checkbox>
          <Checkbox style={{ marginLeft: 20 }} checked={!checked} onChange={() => setChecked(!checked)}>
            不接收
          </Checkbox>
        </View>
      </CustomModal>
    </BasePage>
  );
};

export default StoreTransfer;
