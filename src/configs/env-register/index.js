import { EnvRegister } from '@terminus/rn-debug';
import { formatUrl } from '@terminus/mall-utils';
import { environments, envConfigsMap } from 'configs/environments';

const register = {
  registeredEnv: null,
  registeringPromise: null,
};

export function getEnvAsync() {
  if (register.registeredEnv) {
    return Promise.resolve(register.registeredEnv);
  }
  if (register.registeringPromise) {
    return register.registeringPromise;
  }
  register.registeringPromise = new Promise((resolve) => {
    EnvRegister(environments, (config) => {
      const env = config.id;
      const envConfig = envConfigsMap[env];
      global.env = env;
      const host = formatUrl(envConfig?.url)?.hostname;
      register.registeredEnv = { ...envConfig, host };
      resolve({
        ...envConfig,
        host,
      });
    });
  });
  return register.registeringPromise;
}
