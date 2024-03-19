import React, { useState, useCallback, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { PickerView, Toast } from '@terminus/nusi-mobile';
import PickerModal from 'common/picker-modal';
import Tabs from 'common/tabs';

function padStart(index) {
  return `${index}`.padStart(2, '0');
}

function generateList(length, unit) {
  return new Array(length).fill().map((_, index) => {
    const value = padStart(index);
    return { value, label: `${value}${unit}` };
  });
}

const hourList = generateList(24, '时');
const minuteList = generateList(60, '分');
const secondList = generateList(60, '秒');

const tabs = [
  { key: 'start', title: '开始时间' },
  { key: 'end', title: '结束时间' },
];

function formatTimeToValue(time, mode) {
  const [hour = '00', minute = '00', second = '00'] = (time || '').split(':');
  switch (mode) {
    case 'hour':
      return [hour];
    case 'minute':
      return [hour, minute];
    case 'second':
      return [hour, minute, second];
    default:
      return [];
  }
}

export default function TimeRangePicker({ mode, children, title, value, onConfirm }) {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('start');
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  const handleConfirm = useCallback(() => {
    if (start.join() <= end.join()) {
      onConfirm({ start: start.join(':'), end: end.join(':') });
      setVisible(false);
    } else Toast.info('开始时间不能晚于结束时间');
  }, [end, onConfirm, start]);

  useEffect(() => {
    setStart(formatTimeToValue(value?.start, mode));
    setEnd(formatTimeToValue(value?.end, mode));
  }, [mode, value]);

  useEffect(() => {
    !visible && setActiveTab('start');
  }, [visible]);

  const data = useMemo(() => {
    switch (mode) {
      case 'hour':
        return [hourList];
      case 'minute':
        return [hourList, minuteList];
      case 'second':
        return [hourList, minuteList, secondList];
      default:
        return [];
    }
  }, [mode]);

  const content = useMemo(() => {
    return React.cloneElement(children, { onPress: () => setVisible(true) });
  }, [children]);

  return (
    <>
      {content}
      <PickerModal
        height={280}
        visible={visible}
        title={title}
        onCancel={() => setVisible(false)}
        onConfirm={handleConfirm}
      >
        <Tabs scroll tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <PickerView
          key={activeTab}
          data={data}
          value={activeTab === 'start' ? start : end}
          onChange={activeTab === 'start' ? setStart : setEnd}
        />
      </PickerModal>
    </>
  );
}

TimeRangePicker.defaultProps = {
  title: '选择时间区间',
  mode: 'minute',
  value: { start: dayjs().format('HH:mm:ss'), end: dayjs().format('HH:mm:ss') },
};
