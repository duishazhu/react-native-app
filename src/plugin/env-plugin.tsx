import React, { createContext, useContext, Context } from 'react';
import { isFunction } from '@terminus/mall-utils';

type EnvType = { [key: string]: string | object };

// 环境变量
const envContext: Context<EnvType> = createContext({});

export async function envPlugin(asyncValue) {
  const value = isFunction(asyncValue) ? await asyncValue() : asyncValue;
  return {
    component: envContext.Provider,
    props: { value },
  };
}

export function useEnv() {
  const context = useContext(envContext);
  return context;
}

export function injectEnv<T extends EnvType>(Component: React.ComponentType<T>) {
  return function injectedEnv(props: T) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const env = useEnv();
    return <Component {...props} env={env} />;
  };
}
