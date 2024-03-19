import { request } from '@terminus/mall-utils';

export function login(code) {
  return request('/api/user/web/third-part/app/ep-we-chat-app/login', {
    method: 'POST',
    data: { code },
  });
}
