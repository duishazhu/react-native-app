import zh from 'locale/zh';
import en from 'locale/en';

export const DEFAULT_LANGUAGE = process.env.LANGUAGE || 'zh-CN';

export const LANGUAGE_PACKAGES_MAP = {
  'zh-CN': async () => ({ default: zh }),
  'en-US': async () => ({ default: en }),
};
