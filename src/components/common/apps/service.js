import { request } from '@terminus/mall-utils';

export function browseApp(key) {
  return request('/api/qywx/acl/app/browseAppMeta', { method: 'POST', data: { key } });
}
