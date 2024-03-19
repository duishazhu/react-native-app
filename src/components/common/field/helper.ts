import dayjs from 'dayjs';

export function getStartValue(time?: any) {
  return dayjs(time).startOf('day').valueOf();
}

export function getEndValue(time?: any) {
  return dayjs(time).endOf('day').valueOf();
}

export function getCurrentRange(unit: dayjs.OpUnitType) {
  return `${dayjs().startOf(unit).valueOf()}-${getEndValue()}`;
}

export function getPassRange(value: number, unit: dayjs.ManipulateType) {
  return `${getStartValue(dayjs().subtract(value, unit))}-${getEndValue()}`;
}
