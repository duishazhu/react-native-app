import React, { useMemo } from 'react';
import ModalSelect from 'common/modal-select';
import Tap from 'common/field/tap';

export default function FieldModalSelect({ value, onChange, ...props }) {
  const text = useMemo(() => {
    if (value) {
      if (props.multiple) {
        return value
          .map(
            (v) =>
              props.options.find((option) => option[props.valueKey || 'value'] === v)?.[props.labelKey || 'label'] || v
          )
          .join('; ');
      }
      return (
        props.options.find((option) => option[props.valueKey || 'value'] === value)?.[props.labelKey || 'label'] ||
        value
      );
    }
    return null;
  }, [props.labelKey, props.multiple, props.options, props.valueKey, value]);

  return (
    <ModalSelect {...props} value={value} onConfirm={onChange}>
      <Tap {...props} text={text} />
    </ModalSelect>
  );
}

FieldModalSelect.defaultProps = {
  placeholder: '请选择',
};
