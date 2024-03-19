import React, { isValidElement } from 'react';
import { View, Text } from 'react-native';
import { displayStyles as styles } from 'common/field/style';

export interface IProps {
  style?: any;
  label: string;
  labelWidth?: number;
  value?: string | number | React.ReactElement | React.ReactNode;
}

export default function FieldDisplay({ style, label, labelWidth, value }: IProps) {
  return (
    <View style={[styles.field, style]}>
      <Text style={[styles.fieldLabel, { width: labelWidth }]}>{label}</Text>
      <View style={styles.fieldContent}>
        {isValidElement(value) ? value : <Text style={styles.fieldValue}>{value}</Text>}
      </View>
    </View>
  );
}

FieldDisplay.defaultProps = {
  labelWidth: 72,
};
