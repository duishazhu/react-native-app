import React from 'react';
import { View, Text } from 'react-native';

const Cell = ({ label, value, style, wrapStyle, labelWidth = 70 }) => {
  return (
    <View style={[{ marginBottom: 6, flexDirection: 'row' }, wrapStyle]}>
      <Text style={{ fontSize: 12, color: '#999999', width: labelWidth }}>{label}</Text>
      <Text style={[{ fontSize: 12, color: '#333' }, style]}>{value}</Text>
    </View>
  );
};

export default Cell;
