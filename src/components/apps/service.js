import { request } from '@terminus/mall-utils';

export function getAllApps() {
  return request('/api/qywx/acl/app/queryUserAllAppMeta', { method: 'POST' });
}
