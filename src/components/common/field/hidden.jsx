import React from 'react';
import { Form } from '@terminus/nusi-mobile';
import styles from 'common/field/style';

const InputField = Form.InputField;

export default function FieldHidden(props) {
  return <InputField style={styles.hidden} {...props} />;
}
