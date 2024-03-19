import React from 'react';
import { View, Text } from 'react-native';

const Row = ({ label, value, color = '#333333', style, children }) => {
  return (
    <View style={[{ width: '50%', flexDirection: 'row', marginBottom: 10 }, style]}>
      <Text style={{ width: 70, fontSize: 12, color: '#999999' }}>{label}</Text>
      {children || <Text style={{ flex: 1, fontSize: 12, overflow: 'hidden', color }}>{value}</Text>}
    </View>
  );
};

export default Row;
