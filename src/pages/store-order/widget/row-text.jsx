import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const RowText = ({ label, value, size = 12, color = '#999999', top = 8 }) => {
  return (
    <View style={[styles.row, { marginTop: top }]}>
      <Text style={{ fontSize: size, color }}>{label}</Text>
      <Text style={{ fontSize: size, color }}>{value}</Text>
    </View>
  );
};

export default RowText;
