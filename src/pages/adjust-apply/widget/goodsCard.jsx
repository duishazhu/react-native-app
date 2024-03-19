import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Price from 'pages/store-order/widget/price';
import { InputItem } from '@terminus/nusi-mobile';
import { Icon } from 'common/icon';

const GoodsCard = ({ item, style, onPress, isDisable }) => {
  return (
    <View style={[{ padding: 16, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 6 }, style]}>
      <Image
        style={{ width: 80, height: 80, borderRadius: 6 }}
        source="https://imgpub.chuangkit.com/designTemplate/2022/01/24/5c7408a5-00b8-4a8e-9733-49c4832e478b_thumb?v=1646065201000"
      />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 500 }}>可口可乐{item.id}</Text>
          {isDisable ? null : (
            <TouchableOpacity onPress={() => onPress()}>
              <Icon type="icon-minus" size="xs" />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            fontWeight: 500,
            color: '#999999',
            flexDirection: 'row',
            fontSize: 12,
            marginTop: 4,
            alignItems: 'center',
          }}
        >
          单位：瓶
          <View style={{ width: 1, height: 10, backgroundColor: '#EBEDF0', marginHorizontal: 10 }} />
          规格：1X1瓶
        </View>
        <Text style={{ color: '#999999', fontSize: 12, marginTop: 4 }}>条码：6922211811531</Text>
        {isDisable ? null : (
          <React.Fragment>
            <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
              <Text style={{ color: '#999999', fontSize: 10, marginRight: 12 }}>原零售价</Text>
              <Price isAll={false} size={17} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ color: '#999999', fontSize: 10, marginRight: 22 }}>零售价</Text>
              <InputItem
                alignment="left"
                style={{ backgroundColor: '#F7F8FA', paddingVertical: 4, width: 100, borderRadius: 4 }}
              />
            </View>
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

export default GoodsCard;
