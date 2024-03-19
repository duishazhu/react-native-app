export const DEFAULT_LANGUAGE = process.env.LANGUAGE || 'zh-CN';

export const LANGUAGE_PACKAGES_MAP = {
  'zh-CN': () => import('locale/zh'),
  'en-US': () => import('locale/en'),
};
