import React from 'react';
import { View, Text } from 'react-native';
import styles from 'common/tag/style';

interface IProps {
  style?: any;
  children?: string;
  size?: 'default' | 'small';
  type?: 'info' | 'warning' | 'danger' | 'success' | 'disabled';
  bordered?: boolean;
}

export default function Tag({ style, children, size = 'default', type = 'info', bordered }: IProps) {
  return (
    <View
      style={[
        styles[`${size}Container`],
        bordered ? styles[`${type}BorderContainer`] : styles[`${type}Container`],
        style,
      ]}
    >
      <Text style={[styles[`${size}Text`], styles[`${type}Text`]]}>{children}</Text>
    </View>
  );
}
