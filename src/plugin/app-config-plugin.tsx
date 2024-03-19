import { createContext, Context, useContext } from 'react';
import { request } from '@terminus/mall-utils';

type ConfigType = { [key: string]: string | object };

const AppConfigContext: Context<ConfigType> = createContext({});

const ConfigProvider = AppConfigContext.Provider;

export async function appConfigPlugin(callback) {
  typeof callback === 'function' && callback();
  let value = null;
  try {
    value = await request('/api/herd/app/config', { method: 'GET', quiet: true });
  } catch (e) {
    value = {};
  }
  return {
    component: ConfigProvider,
    props: { value },
  };
}

export function useAppConfig() {
  const context = useContext(AppConfigContext);
  return context;
}
