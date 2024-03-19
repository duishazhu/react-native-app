import React from 'react';
import { Text } from 'react-native';
import { labelStyles as styles } from 'common/field/style';

interface IProps {
  style?: any;
  required?: boolean;
  label: string;
}

export default function FieldLabel({ style, label, required }: IProps) {
  return (
    <Text style={[styles.container, style]}>
      {required && <Text style={styles.required}>＊</Text>}
      {label}
    </Text>
  );
}
