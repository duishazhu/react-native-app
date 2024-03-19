import { useEffect, useRef } from 'react';

/**
 * 定时器hook
 * @param  callback
 * @param  delay 定时器每次执行间隔
 * @param  maxCount 定时器执行最大次数
 */
function useInterval(callback, delay, maxCount = null) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    let id = null;
    let count = 0;

    function tick() {
      count += 1;

      if (maxCount !== null && count > maxCount) {
        clearInterval(id);
      } else {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, maxCount]);
}

export default useInterval;
