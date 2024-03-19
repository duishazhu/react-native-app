import React, { useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Image from 'common/image';
import { Icon } from 'common/icon';
import styles from 'common/notice-bar/style';
import successIcon from 'images/common/notice-success.png';
import failIcon from 'images/common/notice-fail.png';

const typeMap = {
  success: {
    icon: successIcon,
    backgroundColor: '#EBF5ED',
  },
  fail: {
    icon: failIcon,
    backgroundColor: '#FBE7E7',
  },
};

interface IProps {
  style?: any;
  type?: 'success' | 'fail';
  text: string;
  onPress?: () => void;
}

export default function NoticeBar({ style, type, text, onPress }: IProps) {
  const content = useMemo(() => {
    const { icon, backgroundColor } = typeMap[type];
    return (
      <View style={[styles.container, style, { backgroundColor }]}>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.text}>{text}</Text>
        {!!onPress && <Icon type="icon-arrow-right" size={16} color="#7D7E80" />}
      </View>
    );
  }, [onPress, style, text, type]);

  if (onPress) {
    return <TouchableWithoutFeedback onPress={onPress}>{content}</TouchableWithoutFeedback>;
  }

  return content;
}

NoticeBar.defaultProps = {
  type: 'success',
};
