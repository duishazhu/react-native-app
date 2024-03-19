import React from 'react';
import { View, Text } from 'react-native';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import Field from 'common/field';
import Upload from 'common/upload';

const QuantityTable = () => {
  return (
    <BasePage
      style={{ backgroundColor: '#FAFAFA' }}
      leftIconName="icon-back"
      title="商品召回"
      onLeftClick={() => NavigationService.goBack()}
    >
      <View style={{ padding: 16, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>彩虹糖B红色，彩虹仓</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', color: '#999999', fontSize: 12 }}>
          <Text style={{ marginTop: 8, fontSize: 12, width: '50%' }}>条码：6922211811531</Text>
          <Text style={{ marginTop: 8, fontSize: 12, width: '50%' }}>主单位：公斤</Text>
          <Text style={{ marginTop: 8, fontSize: 12, width: '50%' }}>召回批次：20231010</Text>
          <Text style={{ marginTop: 8, fontSize: 12, width: '50%' }}>店铺库存：2.00</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <Field label="申请数量" type="input" />
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#666666', marginBottom: 12 }}>图片</Text>
          <Upload />
          <Text style={{ color: '#969799', fontSize: 12, marginTop: 8 }}>支持jpg.jpeg.png 大小不超过5M，数量4</Text>
        </View>
      </View>
    </BasePage>
  );
};

export default QuantityTable;
