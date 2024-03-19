/**
 * 格式化定位返回的值
 * @param {object} data
 * @returns
 */
export const transPosition = (data) => {
  const { position, formattedAddress, pois } = data;
  const nearestPoi = pois?.[0] || [];
  return {
    latitude: nearestPoi?.location?.lat || position.lat,
    longitude: nearestPoi?.location?.lng || position.lng,
    address: nearestPoi?.address || formattedAddress,
    poiName: nearestPoi?.name,
  };
};

// 经纬度转换成三角函数中度分表形式。
const Rad = (d) => {
  return (d * Math.PI) / 180.0;
};

// 计算两个经纬度之间的距离
export const getDistance = (lat1, lng1, lat2, lng2) => {
  const radLat1 = Rad(lat1);
  const radLat2 = Rad(lat2);
  const a = radLat1 - radLat2;
  const b = Rad(lng1) - Rad(lng2);
  let s = 2 * Math.asin(Math.sqrt(Math.sin(a / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(b / 2) ** 2));
  // EARTH_RADIUS;
  s *= 6378.137;
  s = Math.round(s * 10000) / 10000; // 输出为公里
  return s;
};
