import { envConfigsMap } from 'configs/environments';

const diceWorkSpace = (process.env.DICE_WORKSPACE || '').toLocaleLowerCase();

export function getEnvAsync() {
  const location = window.location;
  const env = envConfigsMap[diceWorkSpace || 'test'];
  env.host = location.hostname;
  return Promise.resolve(env);
}
