import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'common/icon';
import Modal from 'common/modal';
import RowText from './row-text';
import Prcie from './price';

const styles = StyleSheet.create({
  wrap: {
    height: 84,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  text: { flexDirection: 'row', alignItems: 'center' },
  value: { color: '#999999', fontSize: 11, textDecorationLine: 'line-through', marginRight: 6 },
  footerWrap: {
    height: 50,
    borderTopColor: '#EBEDF0',
    borderTopWidth: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
});

const Freight = () => {
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(false);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={{ marginRight: 4 }}>预估运费</Text>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icon size={15} type="icon-icon1" />
          </TouchableOpacity>
        </View>
        <Text>
          <Text style={styles.value}>¥12.00</Text>
          ¥0.00
        </Text>
      </View>
      <View style={[styles.row, { marginTop: 14 }]}>
        <View style={styles.text}>
          <Icon size={17} type="icon-a-fenzu12" />
          <Text style={{ marginLeft: 4 }}>优惠券</Text>
        </View>
        <View style={styles.text}>
          <Text style={{ marginRight: 4 }}>-¥42.00</Text>
          <Icon type="icon-arrow-right" size={12} color="#7D7E80" />
        </View>
      </View>
      <Modal
        style={{ height: 370 }}
        bodyStyle={{ paddingHorizontal: 0, height: 240 }}
        title="运费计算"
        visible={visible}
        onClose={() => setVisible(false)}
        popup
        footerProps={{
          renderFooter: () => {
            return (
              <View style={styles.footerWrap}>
                <Prcie
                  prep={
                    <Text style={{ fontSize: 10, marginRight: 12 }}>
                      <Text style={{ fontSize: 10, color: '#999999', marginRight: 4 }}>已优惠</Text>
                      ¥84
                    </Text>
                  }
                  label="小计"
                />
              </View>
            );
          },
        }}
      >
        <View style={{ flex: 1, overflow: 'auto', height: 240, paddingHorizontal: 16 }}>
          <View style={{ height: 1, backgroundColor: '#EBEDF0' }} />
          <RowText label="预估运费" value="¥180.00" top={16} size={14} color="#333333" />
          <RowText label="起步价" value="¥60.00" />
          <RowText label="额定件数" value="50" />
          <RowText label="数量区间" value="[150,200]" />
          <RowText label="小计" value="¥60*3=¥180" />
          <RowText label="商品限免" value="-¥42.00" top={24} size={14} color="#333333" />
          <TouchableOpacity onPress={() => setShow(!show)}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 12 }}>
              <Text style={{ fontSize: 12, color: '#FF8800', marginRight: 4 }}>限免明细</Text>
              <Icon
                style={show ? { transform: 'rotate(180deg)' } : {}}
                size={8}
                color="#FF8800"
                type="icon-arrow-down"
              />
            </View>
          </TouchableOpacity>
          {show ? (
            <React.Fragment>
              <Text style={{ fontSize: 12, marginTop: 8 }}>热销免运费方案</Text>
              <RowText label="麻辣鱼仔" value="限免7包" />
              <RowText label="麻辣鱼仔" value="限免7包" />
              <Text style={{ fontSize: 12, marginTop: 8 }}>促销免运费方案</Text>
              <RowText label="麻辣鱼仔" value="限免7包" />
            </React.Fragment>
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default Freight;
