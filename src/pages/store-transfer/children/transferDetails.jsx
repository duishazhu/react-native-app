import React from 'react';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Tabs from 'common/tabs';
import usePagination from 'hooks/usePagination';
import { getPointOrderList } from 'point-order/services';
import FlatList from 'common/flat-list';
import { View, Text } from 'react-native';
import Footer from 'common/footer';
import Prcie from 'pages/store-order/widget/price';
import Card from '../widget/card';

const tabs = [
  {
    key: 0,
    title: '调拨商品',
  },
  {
    key: 1,
    title: '基本信息',
  },
  {
    key: 2,
    title: '操作信息',
  },
];

const RowText = ({ label, value, style }) => {
  return (
    <View
      style={[{ paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', backgroundColor: '#FFF' }, style]}
    >
      <Text style={{ width: 82, minWidth: 82, color: '#646566' }}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const TransferDetails = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].key);
  const { result, loadMore, renderFooter } = usePagination(getPointOrderList);

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      title="调拨单明细"
      leftIconName="icon-back"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Tabs
        activeTab={activeTab}
        tabs={tabs}
        onChange={(val) => setActiveTab(val)}
        style={{ backgroundColor: '#fff' }}
      />
      {activeTab === tabs[0].key ? (
        <FlatList
          contentContainerStyle={{ marginTop: 24, paddingHorizontal: 16 }}
          data={
            [
              { id: 1, type: 'audit' },
              { id: 2, type: 'invalid' },
              { id: 3, type: 'draft' },
            ] || result?.data
          }
          keyExtractor={({ id }, index) => `${index}-${id}`}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          renderItem={({ item }) => <Card disable style={{ marginBottom: 10 }} item={item} />}
          ListFooterComponent={renderFooter}
        />
      ) : null}
      {activeTab === tabs[1].key ? (
        <React.Fragment>
          <RowText style={{ marginTop: 10 }} label="调拨单号" value="DB2023101110001" />
          <RowText label="调拨类型" value="调入" />
          <RowText label="调入门店" value="长沙盛世华章店" />
          <RowText label="调出门店" value="长沙古曲路店" />
          <RowText label="发起门店" value="长沙人民路店" />
          <RowText label="单据状态" value="草稿" />
          <RowText label="备注" value="内容内容内容内容内容内容内容内容内容内容内容内容内容" />
        </React.Fragment>
      ) : null}
      {activeTab === tabs[2].key ? (
        <React.Fragment>
          <RowText style={{ marginTop: 10 }} label="创建人" value="零小鸭" />
          <RowText label="创建时间" value="2023-10-13 19:26:20" />
          <RowText label="审核人" value="--" />
          <RowText label="审核结果" value="--" />
          <RowText label="审核意见" value="--" />
          <RowText label="取消原因" value="--" />
        </React.Fragment>
      ) : null}
      <Footer style={{ marginTop: 'auto' }}>
        <Prcie
          size={17}
          label="调拨金额"
          footer={
            <Text style={{ fontSize: 10, marginRight: 12 }}>
              <Text style={{ fontSize: 10, color: '#999999', marginRight: 4 }}>品项数</Text>2
            </Text>
          }
        />
      </Footer>
    </BasePage>
  );
};

export default TransferDetails;
