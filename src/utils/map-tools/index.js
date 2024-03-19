import { AMapPOISearch, AMapReGeocode } from '@terminus/react-native-amap-sdk';

class Map {
  async getNearBy({ latitude, longitude }) {
    // TODO: 后续需要让原生 react-native-amap-sdk 支持附近 poi 的api，现在暂时由逆地理编码接口带出
    const data = await AMapReGeocode(`${latitude}`, `${longitude}`);
    // eslint-disable-next-line no-console
    console.log('[amap] searchNearBy success: ', data);
    return { pois: data?.pois || [] };
  }

  async placeSearch(formattedAddress) {
    // TODO: 后续需要让原生 react-native-amap-sdk 开放完整poi信息
    const data = await AMapPOISearch(formattedAddress, '');
    // eslint-disable-next-line no-console
    console.log('[amap] placeSearch success: ', data);
    return { pois: data?.pois || [] };
  }
}

export default new Map();
