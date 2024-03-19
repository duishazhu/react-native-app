import React, { useCallback } from 'react';
import { DatePicker } from '@terminus/nusi-mobile';
import dayjs from 'dayjs';
import Tap from 'common/field/tap';

export default function FieldDatePicker({ displayFormat, format, mode, value, onChange, ...props }) {
  const handleConfirm = useCallback(
    (v) => {
      const date = dayjs(v);
      onChange(format ? date.format(format) : date.valueOf());
    },
    [format, onChange]
  );

  return (
    <DatePicker mode={mode} value={dayjs(value).toDate()} onConfirm={handleConfirm}>
      <Tap {...props} text={value && dayjs(value).format(displayFormat)} />
    </DatePicker>
  );
}

FieldDatePicker.defaultProps = {
  placeholder: '请选择日期',
  displayFormat: 'YYYY-MM-DD',
  mode: 'date',
};
