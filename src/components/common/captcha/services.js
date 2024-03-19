import { request } from '@terminus/mall-utils';

export function getImageCaptcha(timestamp) {
  return request('/api/user/web/get-captcha', {
    method: 'GET',
    data: timestamp,
  });
}
