import React from 'react';
import { InputItem } from '@terminus/nusi-mobile';
import { textareaStyles as styles } from 'common/field/style';

export default function FieldTextarea(props) {
  return (
    <InputItem
      rows={2}
      style={styles.container}
      inputStyle={styles.inputStyle}
      {...props}
      inline={false}
      clear={false}
    />
  );
}
