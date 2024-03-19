import Store from 'utils/track-session-store/store';
import isEmpty from 'lodash/isEmpty';
import generateId from 'utils/track-session-store/generate-id';
import { addMinutes } from 'date-fns';

const MAX_EFFECTIVE_AGE = 60; // minute

class SessionManage {
  // sessionId
  private sessionStore: Store;

  // sceneId
  private sceneStore: Store;

  // elementInfo
  private elementStore: Store;

  constructor() {
    this.sessionStore = new Store('sessionStore');
    this.sceneStore = new Store('sceneStore');
    this.elementStore = new Store('elementStore');

    this.updateSessionId();
    this.updateSceneId();
  }

  get sessionId() {
    return this.sessionStore.store.sessionId;
  }

  get sceneId() {
    return this.sceneStore.store.sceneId;
  }

  clearElement() {
    this.elementStore.clear();
  }

  get element() {
    return this.elementStore.store;
  }

  getExpireTime() {
    return addMinutes(new Date().getTime(), MAX_EFFECTIVE_AGE).getTime();
  }

  clear() {
    this.sessionStore.clear();
  }

  updateSceneId() {
    this.sceneStore.store = {
      sceneId: generateId(),
    };
  }

  updateElement(element) {
    if (!isEmpty(element)) {
      this.elementStore.store = {
        ...element,
      };
    }
  }

  updateSessionId() {
    if (!this.checkEffective() || !this.sessionStore.store.sessionId) {
      this.sessionStore.store = {
        expireTime: this.getExpireTime(),
        sessionId: generateId(),
      };
      if (process.env.NODE_ENV === 'development')
        // eslint-disable-next-line no-console
        console.log('[sessionManage] session失效，自动刷新', this.sessionStore.store.sessionId);
      return;
    }
    this.sessionStore.store = {
      expireTime: this.getExpireTime(),
      sessionId: this.sessionStore.store.sessionId,
    };
    if (process.env.NODE_ENV === 'development')
      // eslint-disable-next-line no-console
      console.log(
        '[sessionManage] session 刷新到期时间',
        this.sessionStore.store.expireTime,
        this.sessionStore.store.sessionId
      );
  }

  private checkEffective() {
    if (!this.sessionStore.store?.sessionId || this.sessionStore.store?.expireTime <= new Date().getTime()) {
      return false;
    }
    return true;
  }
}

export default new SessionManage();
