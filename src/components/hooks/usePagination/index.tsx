import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { jacksonConverter } from '@terminus/mall-utils';
import useRefCallback from 'hooks/useRefCallback';
import Footer from 'hooks/usePagination/footer';
import { noop, BaseOptions, BaseRequest } from 'hooks/usePagination/types';
import _get from 'lodash/get';
import _set from 'lodash/set';

/**
 * 通过传入分页接口、参数等配置 获取分页列表所需数据
 * @param {object} options getData 分页接口函数 args 初始参数
 */
function usePagination<S = undefined>(getData: noop, options?: BaseOptions<S>): BaseRequest<S> {
  const { dataPath = 'data', totalPath = 'total', needJackson, immediate } = options || {};

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => {
    // 根据 dataPath、totalPath 设置初始 result
    const initResult = {};
    _set(initResult, dataPath, []);
    return _set(initResult, totalPath, 0);
  });

  const init = useRef(immediate);
  const loadingRef = useRef(false);
  const { current: initArgs } = useRef({ pageNo: 1, pageSize: 10, ...(options?.initArgs || {}) });
  const [args, setArgs] = useState(initArgs);

  const total = useMemo(() => _get(result, totalPath, 0), [result, totalPath]);
  const data = useMemo(() => _get(result, dataPath, []), [dataPath, result]);

  const getDataPersist = useRefCallback(getData);

  const _getData = useCallback(() => {
    if (init.current) {
      setLoading(true);
      getDataPersist(args)
        .then((res) => {
          let dataSource = needJackson ? jacksonConverter.parse(JSON.stringify(res)) : res;
          if (args.pageNo > 1) {
            setResult((prevResult) => {
              const newList = [..._get(prevResult, dataPath, []), ..._get(dataSource, dataPath, [])];
              return _set({ ...dataSource }, dataPath, newList);
            });
          } else {
            setResult(dataSource || _set({}, dataPath, []));
          }
        })
        .finally(() => {
          loadingRef.current = false;
          setLoading(false);
        });
    } else {
      init.current = true;
      loadingRef.current = false;
    }
  }, [args, dataPath, getDataPersist, needJackson]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  const refresh = useRefCallback((type) => {
    setArgs(type === 'init' ? { ...initArgs } : { ...args });
  });

  const loadMore = useRefCallback(() => {
    if (!loadingRef.current && total > data?.length) {
      loadingRef.current = true;
      setArgs((prevArgs) => ({ ...prevArgs, pageNo: prevArgs.pageNo + 1 }));
    }
  });

  const renderFooter = useCallback(
    () => <Footer loading={loading} hasMore={total > data?.length} />,
    [data?.length, loading, total]
  );

  return { result, loading, loadMore, renderFooter, refresh, setArgs, args };
}

export default usePagination;
