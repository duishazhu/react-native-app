import { request } from '@terminus/mall-utils';

export async function getAddressList(parentId, level) {
  const params = {
    pageNo: 1,
    pageSize: 999,
    level: level + 1,
  };
  // 如果传入的非省份，则需要传parentDistrict
  if (level !== 0) {
    params.parentId = parentId;
  }
  const result = await request('/api/basic/district/page', {
    data: params,
    method: 'GET',
  });
  return (result?.data || []).map((item) => ({
    ...item,
    code: item.code,
    name: item.name,
    pinyin: item.alias,
    level: item.level,
  }));
}
