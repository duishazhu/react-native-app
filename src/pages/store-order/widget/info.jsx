import React from 'react';
import { View, Text } from 'react-native';
import Prcie from './price';

const Info = () => {
  return (
    <View style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: '#EBEDF0' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>乐事薯片麻辣味</Text>
        <Prcie isAll={false} size={17} />
      </View>
      <Text style={{ fontSize: 12, color: '#999999', marginTop: 4 }}>规格：30g*240包</Text>
      <Text style={{ fontSize: 12, color: '#999999', marginTop: 4 }}>条码：6922211811531</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Prcie
          color="#333333"
          isAll={false}
          size={17}
          extend={<Text style={{ fontSize: 10, color: '#999999', marginLeft: 4 }}>/箱</Text>}
        />
        <Text>7包</Text>
      </View>
    </View>
  );
};

export default Info;
