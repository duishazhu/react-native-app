import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Modal } from '@terminus/nusi-mobile';
import { SafeBottomInset } from 'common/constants';
import styles from 'common/picker-modal/style';

export default function PickerModal({ height, safeBottom, title, children, onCancel, onConfirm, ...props }) {
  return (
    <Modal
      popup
      onClose={onCancel}
      style={[
        styles.pickerModal,
        height && { height: height + (safeBottom ? SafeBottomInset : 0) + 48 },
        safeBottom && { paddingBottom: SafeBottomInset },
      ]}
      {...props}
    >
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.action}>
            <Text style={styles.cancelText}>取消</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{title}</Text>
        <TouchableWithoutFeedback onPress={onConfirm}>
          <View style={styles.action}>
            <Text style={styles.confirmText}>确定</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {children}
    </Modal>
  );
}

PickerModal.defaultProps = {
  safeBottom: true,
};
