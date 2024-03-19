import { request } from '@terminus/mall-utils';

export const queryCashList = (data) => {
  return request('/api/store/cash/pageCashPayIn', { data, method: 'POST' });
};
