import dayjs from 'dayjs';

// 通过 restTime 和时间单位 unit，获得倒计时的结束时间(以ms为单位)
export function calcTargetTime(restTime, unit) {
  if (!restTime || +restTime <= 0) {
    return 0;
  }

  return dayjs().add(restTime, unit).valueOf();
}

export function calcTimeLeft(time) {
  const left = dayjs(time).valueOf() - dayjs().valueOf();
  if (left < 0) {
    return 0;
  }
  return left;
}

/**
 * leftpad 用于填充字符串，递归实现
 * @param  {String} str [需要填充的字符串]
 * @param  {Number} len [填充后的长度]
 * @param  {String} ch  [填充字符，默认为空格]
 * @return {String}     [填充后的文字]
 */
const leftpad = (str, len, ch) => {
  const strTmp = String(str);
  let chTmp = String(ch);

  if (strTmp.length >= len) {
    return strTmp;
  }
  if (!chTmp && chTmp !== 0) {
    chTmp = ' ';
  }

  return leftpad(chTmp + strTmp, len, chTmp);
};

export const formatLeftTime = (ms, leftPadLength = 2) => {
  const curryLeftpad = (t) => leftpad(t, leftPadLength, 0);
  const d = curryLeftpad(Math.floor(ms / 86400000));
  const h = curryLeftpad(Math.floor(ms / 3600000) % 24);
  const m = curryLeftpad(Math.floor(ms / 60000) % 60);
  const s = curryLeftpad(Math.floor(ms / 1000) % 60);

  return { d, h, m, s };
};
