import mapTools from 'utils/map-tools';

// poi列表选择时，需要从poi item中提取需要的数据格式，存入commonData， 格式应与currentPosition.poi一致
export const transChosenPoi = (item) => {
  const { name, address, location, adcode, pname, cityname, adname } = item;
  const longitude = +location.split(',')[0];
  const latitude = +location.split(',')[1];

  return {
    address,
    latitude,
    longitude,
    poi: { address, longitude: +longitude, latitude: +latitude, name },
    addressComponent: { adcode, province: pname, city: cityname, district: adname },
  };
};

export async function getPoi(position) {
  const result = await mapTools.getNearBy(position);
  const [poi] = result?.pois || [];
  const { adcode, adname, pcode, cityname, pname, address, name, location } = poi || {};
  const [longitude, latitude] = (location || '').split(',');
  return {
    ...position,
    address,
    name,
    addressComponent: {
      provinceCode: pcode,
      cityCode: adcode && adcode.slice(0, -2).padEnd(6, 0),
      districtCode: adcode,
      province: pname,
      city: cityname,
      district: adname,
    },
    poi: { address, name, longitude, latitude },
  };
}

export function getLocation(type) {
  return mapTools.getLocation(type);
}
