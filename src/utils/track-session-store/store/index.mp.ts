import { Platform } from 'react-native';
import BaseStore from 'utils/track-session-store/store/store';

export default class Store extends BaseStore {
  get store() {
    const sessionString = Platform.API.getStorageSync(this.key);
    return sessionString ? JSON.parse(sessionString) : {};
  }

  set store(store) {
    if (!store) {
      Platform.API.removeStorageSync(this.key);
      return;
    }
    Platform.API.setStorageSync(this.key, JSON.stringify(store));
  }
}
