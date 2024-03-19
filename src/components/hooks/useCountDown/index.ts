import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { UnitType } from 'dayjs';
import useRefCallback from 'hooks/useRefCallback';
import { calcTimeLeft, formatLeftTime, calcTargetTime } from 'hooks/useCountDown/helper';

interface optionType {
  unit?: UnitType;
  interval?: number;
  manual?: boolean;
  onEnd?: any;
  leftPadLength?: number;
}

/**
 * 一个用于管理倒计时的hooks
 * @param {number} restTime 剩余时间
 * @param {UnitType} [options.unit] 剩余时间单位
 * @param {number} [options.interval] 间隔时间
 * @param {boolean} [options.manual] 是否人为触发
 * @param {function} [options.onEnd] 倒计时结束回调函数
 * @param {number} [options.leftPadLength] 格式化时间的填充长度
 */
function useCountDown(restTime: number, options: optionType) {
  const { unit = 'ms', interval = 1000, manual = false, onEnd, leftPadLength = 2 } = options || {};

  const targetTime = useMemo(() => calcTargetTime(restTime, unit), [restTime, unit]);

  const [leftTime, setLeftTime] = useState(calcTimeLeft(targetTime));

  const timer = useRef<any>();

  const onEndPersist = useRefCallback(() => {
    typeof onEnd === 'function' && onEnd();
  });

  const pause = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const run = useCallback(() => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        const left = calcTimeLeft(targetTime);
        if (left <= 0) {
          pause();
          onEndPersist();
        }
        setLeftTime(left);
      }, interval);
    }
  }, [interval, onEndPersist, pause, targetTime]);

  useEffect(() => {
    setLeftTime(calcTimeLeft(targetTime));
  }, [targetTime]);

  useEffect(() => {
    !manual && run();
    return pause;
  }, [manual, pause, run]);

  const leftTimeFormat = useMemo(() => formatLeftTime(leftTime, leftPadLength), [leftPadLength, leftTime]);

  return { leftTime, leftTimeFormat, pause, run };
}

export default useCountDown;
