import React from 'react';
import { InputItem } from '@terminus/nusi-mobile';
import { inputStyles as styles } from 'common/field/style';

export default function FieldInput(props) {
  return <InputItem style={styles.container} inputStyle={styles.inputStyle} alignment="left" {...props} />;
}
