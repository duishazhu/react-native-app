import React from 'react';
import { View } from 'react-native';
import FieldDisplay, { IProps as IField } from 'common/field/display';
import { panelStyles as styles } from 'common/card/style';

interface IProps {
  style?: any;
  labelWidth?: number;
  fields: IField[];
}

export default function CardPanel({ style, labelWidth, fields }: IProps) {
  return (
    <View style={[styles.container, style]}>
      {fields.map((field, index) => (
        <FieldDisplay key={index} labelWidth={labelWidth} {...field} />
      ))}
    </View>
  );
}
