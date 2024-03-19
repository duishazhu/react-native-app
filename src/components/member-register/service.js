import { request } from '@terminus/mall-utils';

export function memberRegister(data, options) {
  return request('/api/trantor/func/ug_WeComRegisterMemberAction', {
    method: 'POST',
    data: [
      {
        channelType: 'POS',
        ...data,
      },
    ],
    options,
  });
}
