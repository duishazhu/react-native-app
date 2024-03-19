import mapTools from 'utils/map-tools';

// poi列表选择时，需要从poi item中提取需要的数据格式，存入commonData， 格式应与currentPosition.poi一致
export const transChosenPoi = (item) => {
  const { name, address, location, adcode, pname, cityname, adname } = item;
  const latitude = +location.lat;
  const longitude = +location.lng;

  return {
    address,
    latitude,
    longitude,
    poi: { address, longitude: +longitude, latitude: +latitude, name },
    addressComponent: { adcode, province: pname, city: cityname, district: adname },
  };
};

export function getLocation() {
  return new Promise((resolve, reject) => {
    mapTools
      .getLocation()
      .then((data) => {
        // 格式化定位返回的值  展示 经度、纬度、详细地址、poi名称
        const { position, formattedAddress, pois, addressComponent } = data;
        const nearestPoi = pois?.[0] || {};
        resolve({
          latitude: position.lat,
          longitude: position.lng,
          address: formattedAddress,
          addressComponent,
          name: nearestPoi.name,
          poi: {
            address: nearestPoi.address,
            name: nearestPoi.name,
            longitude: nearestPoi.location?.lng,
            latitude: nearestPoi.location?.lat,
          },
        });
      })
      .catch((err) => reject(err));
  });
}

export const getPoi = getLocation;
