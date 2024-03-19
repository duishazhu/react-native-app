import React, { useEffect } from 'react';
import { Modal } from '@terminus/nusi-mobile';
import { View, Text } from 'react-native';

const CustomModal = ({ show = false, children, onPress, onCancel, wrapStyle, title, isSolid, pressText = '提交' }) => {
  const [visibsle, setVisible] = React.useState(show);
  useEffect(() => {
    setVisible(show);
  }, [show]);
  return (
    <Modal visible={visibsle} maskClosable>
      <View
        style={{
          width: 311,
          borderRadius: 16,
          backgroundColor: '#fff',
          paddingTop: 16,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 500 }}>{title}</Text>
        {isSolid ? <View style={{ width: '100%', height: 1, backgroundColor: '#EBEDF0', marginTop: 16 }} /> : null}
        <View style={[{ paddingHorizontal: 16 }, wrapStyle]}>{children}</View>
        <View style={{ flexDirection: 'row', borderTopColor: '#EBEDF0', borderTopWidth: 1, marginTop: 16 }}>
          <Text
            style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#323233', lineHeight: 36 }}
            onPress={() => onCancel()}
          >
            取消
          </Text>
          <View style={{ width: 1, height: 48, backgroundColor: '#EBEDF0' }} />
          <Text
            style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#FF8800', lineHeight: 36 }}
            onPress={() => onPress()}
          >
            {pressText}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
