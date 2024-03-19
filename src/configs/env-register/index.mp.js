import { formatUrl } from '@terminus/mall-utils';
import { envConfigsMap } from 'configs/environments';

const diceWorkSpace = (process.env.DICE_WORKSPACE || '').toLocaleLowerCase();

export function getEnvAsync() {
  const env = envConfigsMap[diceWorkSpace || process.env.NODE_ENV || 'prod'];
  return Promise.resolve({
    ...env,
    host: formatUrl(env?.url)?.hostname,
  });
}

export function getEnv() {
  const env = envConfigsMap[diceWorkSpace || process.env.NODE_ENV || 'prod'];
  return {
    ...env,
    host: formatUrl(env?.url)?.hostname,
  };
}
