import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Tag from 'common/tag';

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff' },
  title: { flexDirection: 'row', justifyContent: 'space-between' },
  text: { fontSize: 16, fontWeight: 500 },
  footer: { fontSize: 13, color: '#999999', marginTop: 6 },
});

const Header = () => {
  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.text}>长沙盛世华章店</Text>
        <Tag type="warning">常规要货</Tag>
      </View>
      <Text style={styles.footer}>操作人：张三</Text>
    </View>
  );
};

export default Header;
