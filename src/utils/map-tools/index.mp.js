/* eslint-disable no-undef */

import { Platform } from 'react-native';

// 高德 web api domain
const amapDomain = 'https://restapi.amap.com';
// 高德webApi 请求服务权限标识 申请地址：https://lbs.amap.com/?ref=http%3A%2F%2Flbs.amap.com%2Fdev%2F
const key = 'a9d6389a8e10f651993d1f4e1409362e';

class WXMap {
  // 高德webApi
  wxRequestWebApi(data, url, error) {
    return new Promise((resolve, reject) => {
      if (error?.errMsg) {
        reject(error);
        return;
      }
      Platform.API.request({
        url: `${amapDomain}${url}`,
        data: {
          key,
          ...data,
        },
        header: {
          'content-type': 'application/json',
        },
        success(res) {
          // eslint-disable-next-line no-console
          console.log('[amap] request success: ', res);
          resolve(res);
        },
        fail(e) {
          reject(e);
        },
      });
    });
  }

  // 微信 获取定位，需在mp_app.config.js 中配置permission
  getLocation(type) {
    return new Promise((resolve, reject) => {
      Platform.API.getLocation({
        type: type || 'gcj02',
        altitude: true,
        success: (e) => {
          resolve(e);
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  }

  /**
   * 高德webApi 获取周边
   * @param {*} center 中心点，格式为 [longitude, latitude]
   * @param {*} radius 搜索半径，默认为 2000 m
   * @param {*} params 参数 https://lbs.amap.com/api/webservice/guide/api/newpoisearch#t6
   * @returns
   */
  async getNearBy(center = {}, radius = 2000, params = {}) {
    // 经度在前 纬度在后
    const location = `${center.longitude},${center.latitude}`;
    const requestParam = {
      location,
      radius,
      page_size: 20,
      ...params,
    };
    const result = await this.wxRequestWebApi(requestParam, '/v5/place/around');
    return result?.data || [];
  }

  // 高德 获取Poi
  async placeSearch(keywords, params = {}) {
    if (!`${keywords.trim()}`) {
      return [];
    }

    const requestParam = {
      keywords,
      ...params,
    };

    const result = await this.wxRequestWebApi(requestParam, '/v3/place/text');
    return result?.data || {};
  }

  /**
   * 逆地理编码 https://lbs.amap.com/api/webservice/guide/api/georegeo#regeo
   * @param {*} params 请求参数
   */
  async reGeocode(params = {}) {
    const result = await this.wxRequestWebApi(params, '/v3/geocode/regeo');
    return result?.data || {};
  }

  // 生成地图选点

  /**
   *属性	     类型	     默认值	必填	说明	                                    最低版本
   *latitude	number		      否	  目标地纬度	                               2.9.0
   *longitude	number		      否	  目标地经度                                 2.9.0
   *	 以下三个函数为wx.chooseLocation 的参数，供维护此方法的开发参考
   *success	  function	      否	  接口调用成功的回调函数
   *fail	    function	      否	  接口调用失败的回调函数
   *complete	function	      否	  接口调用结束的回调函数（调用成功、失败都会执行）
   *
   * @memberof WXMap
   */
  renderMapPicker(latitude, longitude) {
    let param = {};
    if (latitude && longitude) {
      param = {
        latitude,
        longitude,
      };
    }
    return new Promise((resolve, reject) => {
      Platform.API.chooseLocation({
        ...param,
        success: (e) => {
          resolve(e);
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  }
}

export default new WXMap();
