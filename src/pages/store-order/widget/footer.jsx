import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Prcie from './price';

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: { fontSize: 10, color: '#999999', flexDirection: 'row', marginTop: 4, lineHeight: 12 },
  num: { fontSize: 10, color: '#333333', marginLeft: 4, marginRight: 8, lineHeight: 12 },
});

const Footer = ({ btns = [], extra, values = {} }) => {
  return (
    <View style={styles.wrap}>
      <View>
        <Prcie />
        {extra || (
          <View style={styles.text}>
            数量
            <Text style={styles.num}>{values.num}</Text>
            品项
            <Text style={styles.num}>{values.item}</Text>
          </View>
        )}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {btns.map((el) => {
          return el;
        })}
      </View>
    </View>
  );
};

export default Footer;
