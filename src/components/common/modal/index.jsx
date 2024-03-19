import React from 'react';
import { Icon } from 'common/icon';
import styles from 'common/modal/style';
import { Modal as OriginModal } from '@terminus/nusi-mobile';
import Button from 'common/button';
import { SafeBottomInset, SafeTopInset } from 'common/constants';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function Modal(props) {
  const {
    style: modalStyle,
    containerStyle,
    bodyStyle,
    footerStyle,
    useScrollView = true,
    closable = true,
    headerStyle,
    title,
    onClose,
    footerProps,
    needSafeBottom = true,
    needSafeTop = false,
    ...otherProps
  } = props;
  const { btnText, style: btnStyle, onPress, renderFooter, ...otherFooterProps } = footerProps;
  const hasHeader = title || closable;
  const hasFooter = Object.keys(footerProps).length > 0;
  const containerSafeStyle = {
    paddingBottom: needSafeBottom ? SafeBottomInset : 0,
    paddingTop: needSafeTop ? SafeTopInset : 0,
  };

  const footerElement =
    typeof renderFooter === 'function' ? (
      renderFooter()
    ) : (
      <View style={[styles.modalFooter, footerStyle]}>
        <Button style={btnStyle} type="primary" onPress={onPress} size="large" {...otherFooterProps}>
          {btnText || '确定'}
        </Button>
      </View>
    );

  return (
    <OriginModal
      popup
      maskClosable={closable}
      closable={false}
      onClose={onClose}
      animationType="slide-up"
      style={StyleSheet.flatten([styles.commonModal, modalStyle])}
      {...otherProps}
    >
      <View style={[styles.modalContent, containerSafeStyle, containerStyle]}>
        {hasHeader ? (
          <View style={[styles.modalHeader, headerStyle]}>
            <Text style={styles.modalTitle}>{title || ''}</Text>
            {closable ? (
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalCloseIcon}>
                  <Icon type="close" width={20} height={20} />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        ) : null}
        {useScrollView ? (
          <ScrollView contentContainerStyle={[styles.modalBody, bodyStyle]}>{props.children}</ScrollView>
        ) : (
          <View style={[styles.modalBody, bodyStyle]}>{props.children}</View>
        )}
        {hasFooter ? footerElement : null}
      </View>
    </OriginModal>
  );
}

Modal.defaultProps = {
  useScrollView: true,
  footerProps: {},
};
