import React from 'react';
import TimeRangePicker from 'common/time-range-picker';
import Tap from 'common/field/tap';

export default function FieldTimeRangePicker({ value, onChange, ...props }) {
  return (
    <TimeRangePicker {...props} value={value} onConfirm={onChange}>
      <Tap {...props} text={value && `${value.start} 至 ${value.end}`} />
    </TimeRangePicker>
  );
}

FieldTimeRangePicker.defaultProps = {
  placeholder: '请选择时间',
};
