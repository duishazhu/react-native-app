import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnShow } from '@terminus/octopus-hooks';
import useRefCallback from 'hooks/useRefCallback';

function useVoid(): void {}

type AsyncFunction = (...args: any[]) => any | Promise<any>;

type Executor = (...args: any[]) => Promise<any>;

type Status = 'success' | 'loading' | 'idle' | 'fail';

/**
 * 仅对异步函数做简单处理，返回一个新的函数和loading、result、error等状态
 * @param asyncFunction
 * @param options.immediate 是否组件加载时自动执行
 */
export default function useRequest<A extends AsyncFunction>(
  asyncFunction: A,
  {
    immediate = true,
    fetchOnshow = false,
  }: {
    immediate?: boolean;
    fetchOnshow?: boolean;
  } = {}
): {
  executor: Executor;
  result: any;
  error: any;
  loading: boolean;
  status: Status;
} {
  const [{ result, status, error }, setState] = useState<{ status: Status; result: any; error: any }>({
    status: 'idle',
    result: undefined,
    error: undefined,
  });

  const unmountedRef = useRef(false);
  const cbRef = useRef(asyncFunction);

  cbRef.current = asyncFunction;

  const executor = useCallback(async (...args: any[]) => {
    setState((prev) => ({ ...prev, error: undefined, status: 'loading' }));
    try {
      const res = await cbRef.current(...args);
      setState((prev) => ({ ...prev, result: res, status: 'success' }));
      return res;
    } catch (err) {
      setState((prev) => ({ ...prev, result: undefined, error: err, status: 'fail' }));
      return Promise.reject(err);
    }
  }, []);

  const dispatch = useRefCallback(() => {
    if (!unmountedRef.current && immediate) {
      executor();
    }
  });

  (fetchOnshow ? useVoid : useEffect)(() => {
    dispatch();
  }, [dispatch]);

  (fetchOnshow ? useOnShow : useVoid)(dispatch);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return {
    executor,
    result,
    status,
    error,
    loading: status === 'loading',
  };
}
