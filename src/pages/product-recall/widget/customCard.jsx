import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from 'common/card';
import { Image } from '@terminus/nusi-mobile';
import { NavigationService } from '@terminus/react-navigation';
import Row from './row';

const CustomCard = ({ item }) => {
  console.log(item);
  return (
    <Card actions={[{ children: '申请数量', onPress: () => NavigationService.navigate('QuantityTable') }]}>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>彩虹糖B红色，彩虹仓</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#EBEDF0', marginVertical: 12 }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Row label="主单位" value="公斤" />
          <Row label="召回批次" value="20231010" color="#EE0A24" />
          <Row label="店铺库存" value="2.00" />
          <Row label="申请数量" value="1.00" />
          <Row label="审核数量" value="2.00" />
          <Row label="复核数量" value="0.00" />
          <Row label="图片">
            <Image
              style={{ width: 44, height: 44 }}
              source="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"
            />
          </Row>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default CustomCard;
