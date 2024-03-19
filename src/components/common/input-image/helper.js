/**
 * 将小程序上传返回的array转化为object
 * @param  {文件信息数组} data
 */

export function formatResult(data) {
  let obj = {};
  data.forEach((item) => Object.assign(obj, JSON.parse(item)));
  return obj;
}
