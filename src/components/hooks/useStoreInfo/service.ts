import { request } from '@terminus/mall-utils';
import { AsyncStorage } from '@terminus/nusi-mobile';

export function setStore(id) {
  return AsyncStorage.set('storeId', id);
}

export async function getStore() {
  const id = await AsyncStorage.get('storeId');
  if (id) {
    const result = await request('/api/trantor/func/store_center_WeComStoreDetailFunc', {
      method: 'POST',
      data: [{ value: id }],
      quiet: true,
      headers: {
        'From-Menu-Key': 'mix_mix_WeCom_center_WeComStoreDetailFunc',
        'Trantor-Module': 'mix_mix_item_center',
      },
    });
    return { ...result, name: result.storeName };
  }
  return null;
}
