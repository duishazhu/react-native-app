/* eslint-disable camelcase */
interface IStore {
  sessionId?: string;
  sceneId?: string;
  Um_Key_ComponentType?: string;
  Um_Key_ElementInfo?: string;
  expireTime?: number;
}

export default class BaseStore {
  private _store: IStore;

  key: string;

  constructor(storeKey: string) {
    this.key = storeKey;
  }

  get store() {
    return this._store;
  }

  set store(store: IStore) {
    this._store = store;
  }

  public clear() {
    this._store = null;
  }
}
