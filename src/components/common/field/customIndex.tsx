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
  slot?: any;
}

export default function CustomField({ style, required, label, type, customProps, value, onChange, slot }: IProps) {
  const FieldComponent = useMemo(() => (typeof type === 'string' ? FIELD_TYPE_MAP[type] : type), [type]);

  return (
    <View style={[styles.field, style, { minHeight: 30, paddingHorizontal: 0 }]}>
      <FieldLabel
        style={[styles.fieldLabel, { fontSize: 10, color: '#999999', marginRight: 12, whiteSpace: 'nowrap' }]}
        label={label}
        required={required}
      />
      {slot || (
        <View
          style={[
            styles.fieldContent,
            { backgroundColor: '#F7F8FA', paddingHorizontal: 8, borderRadius: 4, width: 98 },
          ]}
        >
          <FieldComponent style={{ paddingVertical: 5 }} {...customProps} value={value} onChange={onChange} />
        </View>
      )}
    </View>
  );
}

CustomField.defaultProps = {
  type: 'input',
};
