import React, { isValidElement, PropsWithChildren, useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'common/icon';
import styles from 'common/expand-bar/style';

interface IProps {
  style?: any;
  contentStyle?: any;
  defaultVisible?: boolean;
  title: string | React.ReactElement | React.ReactNode;
  titleStyle?: any;
}

export default function ExpandBar({
  style,
  contentStyle,
  defaultVisible,
  title,
  titleStyle,
  children,
}: PropsWithChildren<IProps>) {
  const [visible, setVisible] = useState(defaultVisible);

  useEffect(() => {
    setVisible(defaultVisible);
  }, [defaultVisible]);

  return (
    <>
      <View style={[styles.container, style]}>
        {isValidElement(title) ? title : <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
          <View style={styles.arrowContainer}>
            <Icon type={visible ? 'icon-arrow-up' : 'icon-arrow-down'} size={18} color="#7D7E80" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[contentStyle, { display: visible ? 'flex' : 'none' }]}>{children}</View>
    </>
  );
}
