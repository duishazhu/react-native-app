import { fetchLocation, AMapReGeocode } from '@terminus/react-native-amap-sdk';

// poi列表选择时，需要从poi item中提取需要的数据格式，存入commonData， 格式应与currentPosition.poi一致
export async function transChosenPoi(item) {
  const { name, address, latitude, longitude, adcode } = item;
  // TODO: 目前原生sdk 获取附近poi、搜索poi 两个接口均未开放完整poi信息，因此在此处二次调用接口去获取 addressComponent
  const { city, citycode, country, district, number, province, street } = await AMapReGeocode(
    `${latitude}`,
    `${longitude}`
  );

  const poiInfo = {
    address,
    latitude,
    longitude,
    poi: { address, longitude: +longitude, latitude: +latitude, name },
    addressComponent: { adcode, city, citycode, country, district, street, streetNumber: number, province },
  };

  return poiInfo;
}

export async function getLocation() {
  return new Promise((resolve, reject) => {
    fetchLocation((lp, err) => {
      if (err) {
        reject(err);
        return;
      }
      const { data } = lp || {};
      const {
        POIName,
        adCode,
        city,
        cityCode,
        country,
        district,
        formattedAddress,
        latitude,
        longitude,
        number,
        province,
        street,
      } = data || {};

      // 数据格式与 jsapi 定位返回值保持一致
      resolve({
        address: formattedAddress,
        addressComponent: {
          adcode: adCode,
          city,
          citycode: cityCode,
          country,
          province,
          district,
          street,
          streetNumber: number,
        },
        name: POIName,
        latitude: +latitude,
        longitude: +longitude,
        poi: { address: formattedAddress, name: POIName, longitude: +longitude, latitude: +latitude },
      });
    });
  });
}

export const getPoi = getLocation;
