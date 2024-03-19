import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import DateRangePicker from 'common/date-range-picker';
import Tap from 'common/field/tap';
import FieldButtonSelect from 'common/field/button-select';

export default function FieldDateRangePicker({ options, displayFormat, value, onChange, ...props }) {
  const handleChange = useCallback(
    (v) => {
      if (v) {
        const [start, end] = v.split('-');
        onChange({ start: Number(start), end: Number(end) });
      } else onChange();
    },
    [onChange]
  );

  return (
    <>
      <FieldButtonSelect options={options} value={value && `${value.start}-${value.end}`} onChange={handleChange} />
      <DateRangePicker {...props} value={value} onConfirm={onChange}>
        <Tap
          {...props}
          text={value && `${dayjs(value.start).format(displayFormat)} 至 ${dayjs(value.end).format(displayFormat)}`}
        />
      </DateRangePicker>
    </>
  );
}

FieldDateRangePicker.defaultProps = {
  placeholder: '请选择日期',
  displayFormat: 'YYYY-MM-DD',
};
