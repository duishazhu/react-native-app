import React, { useState } from 'react';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import FlatList from 'common/flat-list';
import usePagination from 'hooks/usePagination';
import { getPointOrderList } from 'point-order/services';
import Tabs from 'common/tabs';
import Footer from 'common/footer';
import Prcie from 'pages/store-order/widget/price';
import { tabs } from '../constants';
import CustomCard from '../widget/customCard';
import RowText from '../widget/rowText';

const RecallApplication = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { result, loadMore, renderFooter } = usePagination(getPointOrderList);

  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="商品召回"
      onLeftClick={() => NavigationService.goBack()}
    >
      <Tabs
        activeTab={activeTab}
        tabs={tabs}
        onChange={(val) => setActiveTab(val)}
        itemStyle={{ paddingHorizontal: 0 }}
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
          renderItem={({ item }) => <CustomCard item={item} />}
          ListFooterComponent={renderFooter}
        />
      ) : null}
      {activeTab === tabs[1].key ? (
        <React.Fragment>
          <RowText style={{ marginTop: 10 }} label="召回单号" value="DB2023101110001" />
          <RowText label="任务名称" value="乐视薯片召回通知" />
          <RowText label="关联任务单号" value="ZHRW2023101000010" />
          <RowText label="召回门店" value="长沙古曲路店" />
          <RowText label="召回日期" value="2023年10月14日~2023年10月14日" />
          <RowText label="单据状态" value="草稿" />
          <RowText label="召回说明" value="尊敬的客户:南瓜馅产品存在XX的质量问题，目前希望收到通知的客户立刻停止使用" />
        </React.Fragment>
      ) : null}
      {activeTab === tabs[2].key ? (
        <React.Fragment>
          <RowText style={{ marginTop: 10 }} label="创建人" value="零小鸭" />
          <RowText label="创建时间" value="2023-10-13 19:26:20" />
          <RowText label="审核人" value="--" />
          <RowText label="审核时间" value="--" />
          <RowText label="审核结果" value="--" />
          <RowText label="审核意见" value="--" />
          <RowText label="关闭原因" value="--" />
        </React.Fragment>
      ) : null}
      <Footer actions={[{ children: '确定' }]} style={{ marginTop: 'auto' }}>
        <Prcie value={0} unit={null} size={17} label="商品数量" />
      </Footer>
    </BasePage>
  );
};

export default RecallApplication;
