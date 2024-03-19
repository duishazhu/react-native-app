import { request } from '@terminus/mall-utils';

function formatStoreList(data) {
  return data.map((item) => {
    if (item.level === 'STORE') {
      return {
        ...item,
        id: item.storeId,
      };
    }
    return {
      ...item,
      childList: formatStoreList(item.childList),
    };
  });
}

export async function getNearbyStoreList(params) {
  const result = await request('/api/trantor/func/store_center_WeComNearbyStoreFunc', {
    method: 'POST',
    data: [{ size: 6, ...params }],
    headers: { 'From-Menu-Key': 'mix_mix_WeCom_center_WeComNearbyStore', 'Trantor-Module': 'mix_mix_item_center' },
  });
  return (result || []).map((item) => ({ ...item, name: item.storeName }));
}

export async function getCityStoreList() {
  const data = await request('/api/trantor/func/store_center_CityStoreListFunc', {
    method: 'POST',
    data: [],
    headers: { 'From-Menu-Key': 'mix_mix_WeCom_center_CityStoreList', 'Trantor-Module': 'mix_mix_item_center' },
  });

  return formatStoreList(data);
}

export async function getDistrictStoreList() {
  const data = await request('/api/trantor/func/store_center_DistrictStoreListFunc', {
    method: 'POST',
    data: [],
    headers: { 'From-Menu-Key': 'mix_mix_WeCom_center_DistrictStoreList', 'Trantor-Module': 'mix_mix_item_center' },
  });

  return formatStoreList(data);
}
