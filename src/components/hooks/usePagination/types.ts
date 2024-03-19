import React from 'react';

export type noop = (...args: any[]) => any;

export type BaseOptions<S> = {
  initArgs?: S;
  isOnShow?: boolean;
  dataPath?: string;
  totalPath?: string;
  needJackson?: boolean;
  immediate?: boolean;
};

type RefreshType = 'init';

export type BaseRequest<S> = {
  refresh: (type: RefreshType) => void;
  result: any;
  loading: boolean;
  loadMore: () => void;
  renderFooter: () => void;
  setArgs: React.Dispatch<React.SetStateAction<S | undefined>>;
  args: S;
};
