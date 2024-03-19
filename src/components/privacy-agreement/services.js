import { request } from '@terminus/mall-utils';

export function requestPrivacyInfo() {
  return request('/api/cms/article/privacy/list', {
    method: 'GET',
  });
}

export function isShowArticle() {
  return request('/api/cms/article/check/pop', {
    method: 'GET',
  });
}
