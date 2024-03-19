import BaseStore from 'utils/track-session-store/store/store';

export default class Store extends BaseStore {
  get store() {
    const sessionString = sessionStorage.getItem(this.key);
    return sessionString ? JSON.parse(sessionString) : {};
  }

  set store(store) {
    if (!store) {
      sessionStorage.removeItem(this.key);
      return;
    }
    sessionStorage.setItem(this.key, JSON.stringify(store));
  }
}
