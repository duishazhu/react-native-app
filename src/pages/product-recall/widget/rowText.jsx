import React from 'react';
import { View, Text } from 'react-native';

const RowText = ({ label, value, style }) => {
  return (
    <View
      style={[{ paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', backgroundColor: '#FFF' }, style]}
    >
      <Text style={{ width: 92, minWidth: 92, color: '#646566', lineHeight: 20 }}>{label}</Text>
      <Text style={{ lineHeight: 20 }}>{value}</Text>
    </View>
  );
};

export default RowText;
