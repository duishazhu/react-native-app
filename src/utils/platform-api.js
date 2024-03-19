import { Platform } from 'react-native';
import _isFunction from 'lodash/isFunction';

class PlatformApi {
  constructor() {
    this.platform = Platform.OS;
    this.stashData = {};
  }

  get(method, ...restArgs) {
    const key = `${this.platform}_${method}_${restArgs.join('_')}`;
    if (this.stashData[key]) {
      return this.stashData[key];
    }

    if (_isFunction(Platform.API?.[method])) {
      const result = Platform.API[method](...restArgs);
      this.stashData[key] = result;

      return result;
    }

    return {};
  }
}

export default new PlatformApi();
