import { request } from '@terminus/mall-utils';

/**
 * 获取微信权限token
 */
export function getWechatToken(params) {
  return request('/api/trantor/flow/marketing_AssembleWechatSignInfoFlow', {
    method: 'POST',
    data: [params],
    quiet: true,
    preventToLogin: true,
  });
}
