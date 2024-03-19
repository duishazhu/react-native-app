import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center' },
  all: { fontSize: 12, color: '#333333', marginRight: 4, fontWeight: 700, lineHeight: 14 },
  priceText: { fontWeight: 700 },
});

const Prcie = ({
  value = '1024.88',
  isAll = true,
  size = 21,
  style,
  label = '合计',
  extend,
  color,
  prep,
  footer,
  unit = '¥',
}) => {
  return (
    <React.Fragment>
      <View style={[styles.wrap, style]}>
        {prep}
        {isAll && <Text style={styles.all}>{label}</Text>}
        <Text style={[styles.priceText, { fontSize: size, lineHeight: size, color: color || '#FF8800' }]}>
          {unit ? <Text style={{ fontSize: 12 }}>{unit}</Text> : null}
          {value}
        </Text>
        {extend}
      </View>
      {footer}
    </React.Fragment>
  );
};

export default Prcie;
