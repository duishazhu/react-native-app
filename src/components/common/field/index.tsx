import React, { useMemo } from 'react';
import { View } from 'react-native';
import FieldLabel from 'common/field/label';
import styles from 'common/field/style';

import FieldInput from './input';
import FieldTextarea from './textarea';
import FieldRadio from './radio';
import FieldModalSelect from './modal-select';
import FieldDatePicker from './date-picker';
import FieldDateRangePicker from './date-range-picker';
import FieldTimeRangePicker from './time-range-picker';
import FieldStoreSelect from './store-select';

const FIELD_TYPE_MAP = {
  input: FieldInput,
  textarea: FieldTextarea,
  radio: FieldRadio,
  modalSelect: FieldModalSelect,
  datePicker: FieldDatePicker,
  dateRangePicker: FieldDateRangePicker,
  timeRangePicker: FieldTimeRangePicker,
  storeSelect: FieldStoreSelect,
};

interface IProps {
  style?: any;
  required?: boolean;
  label: string;
  labelWidth?: number;
  type?: keyof typeof FIELD_TYPE_MAP | React.ReactNode;
  customProps?: any;
  value?: any;
  onChange?: (...arg: any[]) => void;
}

export default function Field({ style, required, label, labelWidth, type, customProps, value, onChange }: IProps) {
  const FieldComponent = useMemo(() => (typeof type === 'string' ? FIELD_TYPE_MAP[type] : type), [type]);

  return (
    <View style={[styles.field, style]}>
      <FieldLabel style={[styles.fieldLabel, { width: labelWidth }]} label={label} required={required} />
      <View style={styles.fieldContent}>
        <FieldComponent {...customProps} value={value} onChange={onChange} />
      </View>
    </View>
  );
}

Field.defaultProps = {
  type: 'input',
  labelWidth: 72,
};
