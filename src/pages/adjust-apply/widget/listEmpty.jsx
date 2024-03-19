import React from 'react';
import { View, Image, Text } from 'react-native';
import empty from 'images/store-order/empty.png';

const ListEmpty = ({ source = null, text = '暂无商品' }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image style={{ width: 206, height: 206 }} source={source || empty} />
      <Text style={{ color: '#999999' }}>{text}</Text>
    </View>
  );
};

export default ListEmpty;
