import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Modal } from '@terminus/nusi-mobile';
import Footer from 'common/footer';
import { centerStyles as styles } from 'common/modal/style';

export default function CenterModal({
  style,
  contentStyle,
  title,
  children,
  actions,
  footerExtra,
  maskClosable,
  ...props
}) {
  const contentView = (
    <>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
      </View>
      <ScrollView contentContainerStyle={contentStyle}>{children}</ScrollView>
      <Footer style={styles.footer} fixBottom={false} actions={actions}>
        {footerExtra}
      </Footer>
    </>
  );
  return (
    <Modal style={[styles.modal, style]} closable={false} {...props}>
      {maskClosable ? (
        <View style={{ flex: 1 }} onStartShouldSetResponder={() => true} onClick={(e) => e?.stopPropagation()}>
          {contentView}
        </View>
      ) : (
        { contentView }
      )}
    </Modal>
  );
}
