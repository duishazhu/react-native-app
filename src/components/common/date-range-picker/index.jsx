import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import XDate from 'xdate';
import dayjs from 'dayjs';
import { DatePicker } from '@terminus/nusi-mobile';
import { Calendar } from '@terminus/rmc-calendar';
import { Icon } from 'common/icon';
import Modal from 'common/modal';
import { getStartValue, getEndValue } from 'common/field/helper';
import styles, { calendarTheme } from 'common/date-range-picker/style';

export default function DateRangePicker({ children, title, value, onConfirm, ...props }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(value);
  const [currentMonth, setCurrentMonth] = useState(dayjs(value.start).toDate());

  const increment = useRef(0);
  const calendarRef = useRef();

  const handleDayPress = (date) => {
    const time = dayjs(date).valueOf();
    setCurrent((prev) => {
      if (++increment.current % 2 === 0) {
        return prev.start <= time
          ? { ...prev, end: getEndValue(time) }
          : { start: getStartValue(time), end: getEndValue(prev.start) };
      }
      return { start: getStartValue(time), end: undefined };
    });
  };

  const handleMonthChange = (v) => {
    calendarRef.current.state.currentMonth = new XDate(v);
    setCurrentMonth(v);
  };

  const handleConfirm = useCallback(() => {
    if (current.start && current.end) {
      onConfirm(current);
      setVisible(false);
    }
  }, [current, onConfirm]);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const content = useMemo(() => {
    return React.cloneElement(children, { onPress: () => setVisible(true) });
  }, [children]);

  return (
    <>
      {content}
      <Modal
        visible={visible}
        title={title}
        closable
        bodyStyle={styles.modalBodyStyle}
        footerProps={{ onPress: handleConfirm }}
        onClose={() => setVisible(false)}
      >
        <DatePicker mode="month" value={currentMonth} onConfirm={handleMonthChange}>
          <TouchableWithoutFeedback>
            <View style={styles.monthPicker}>
              <Text style={styles.monthPickerText}>{dayjs(currentMonth).format('YYYY年MM月')}</Text>
              <Icon type="icon-arrow-down" size={12} color="#999999" />
            </View>
          </TouchableWithoutFeedback>
        </DatePicker>
        <Calendar
          ref={calendarRef}
          {...props}
          start="开始"
          end="结束"
          isMultiSelect
          theme={calendarTheme}
          current={current}
          onDayPress={handleDayPress}
        />
      </Modal>
    </>
  );
}

DateRangePicker.defaultProps = {
  title: '选择日期区间',
  minDate: dayjs('2020-01-01').toDate(),
  maxDate: dayjs('2029-12-31').toDate(),
  value: { start: getStartValue(), end: getEndValue() },
};
