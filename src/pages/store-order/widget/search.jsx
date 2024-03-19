import React from 'react';
import { Icon } from 'common/icon';
import Input from 'common/field/input';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrap: { height: 52, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff', flexDirection: 'row' },
  row: {
    backgroundColor: '#F7F8FA',
    borderRadius: 19,
    height: 36,
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: { flex: 1, backgroundColor: '#F7F8FA', paddingTop: 0, paddingBottom: 0 },
});

const Search = ({ rightExtra, rowStyle, inputExtra }) => {
  return (
    <View style={styles.wrap}>
      <View style={[styles.row, rowStyle]}>
        <Icon size={16} color="#C8C9CC" type="icon-a-fenzu31" />
        <Input style={styles.input} placeholder="输入商品名称、条码、助记码" />
        {inputExtra}
      </View>
      {rightExtra}
    </View>
  );
};

export default Search;
