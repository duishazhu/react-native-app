import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Cell from 'pages/store-order/widget/cell';
import { Image } from '@terminus/nusi-mobile';

const ReceiptsDetails = () => {
  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="缴款单详情"
      onLeftClick={() => NavigationService.goBack()}
    >
      <View style={{ padding: 16, backgroundColor: '#fff', marginTop: 8 }}>
        <Text style={{ fontWeight: 500 }}>JK2023090610003</Text>
        <View style={{ color: '#999999', flexDirection: 'row', marginTop: 8 }}>
          <Text style={{ fontSize: 12 }}>申请门店</Text>
          <Text style={{ color: '#646566', marginLeft: 12, fontSize: 12 }}>盛世华章店</Text>
        </View>
        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
        <Cell label="缴款余额" value="￥500.00" style={{ color: '#FF8800' }} />
        <Cell label="现金余额" value="￥500.00" style={{ color: '#FF8800' }} />
        <Cell label="缴款日" value="2023-09-06" />
        <Cell label="备注" value="无" />
        <Cell label="申请人" value="0092王丽" />
        <Cell label="创建时间" value="2023-05-01 10:00:00" />
        <View style={{ width: '100%', height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
        <Text style={{ color: '#666666' }}>附件</Text>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Image
            style={{ width: 80, height: 80 }}
            source="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
          />
          <Image
            style={{ width: 80, height: 80 }}
            source="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
          />
          <Image
            style={{ width: 80, height: 80 }}
            source="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
          />
        </View>
      </View>
    </BasePage>
  );
};

export default ReceiptsDetails;
