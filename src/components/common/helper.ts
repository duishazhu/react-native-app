import { StyleSheet, Platform } from 'react-native';
import { parse } from 'intl-messageformat-parser';
import { format, getTime } from 'date-fns';
import _get from 'lodash/get';
import _isFun from 'lodash/isFunction';
import _find from 'lodash/find';
import { themes } from 'styles/theme';
import { NavigationService } from '@terminus/react-navigation';
import { Modal, AsyncStorage } from '@terminus/nusi-mobile';
import { formatUrl, cdnPath, getQueryData, request } from '@terminus/mall-utils';
import { isIOS, isAndroid, isWechat, isWxMp } from 'utils/platform';
import {
  DEVICE_TYPE,
  URL_REG,
  ADDRESS_STORAGE_KEY,
  DEFAULT_ADDRESS,
  FORMAT,
  deviceWidth,
  UPLOAD_LIMIT_SIZE,
  AUTHORIZED_FROM,
  UNAUTHORIZED_FROM,
} from 'common/constants';

export { default as formatPrice } from 'utils/format-price';

export function getStyle(style: number | Array<any> | any): any {
  if (typeof style === 'number') {
    return StyleSheet.flatten(style);
  }

  if (Array.isArray(style)) {
    const styleList = style.map((it) => {
      return getStyle(it);
    });
    return Object.assign({}, ...styleList);
  }

  return style || {};
}

interface layoutProps {
  width?: number;
  height?: number;
  size?: number;
  style?: any;
}
/**
 * 通过 width|height、size、style等props获取组件的宽高样式
 * 权重：width|height > size > style
 * @param props 组件props
 * @param defaultWidth 默认宽度
 * @param defaultHeight 默认宽度
 */
export function getLayoutStyle(props: layoutProps, defaultWidth, defaultHeight) {
  const { width, height, size, style } = props;
  const layoutStyle = getStyle(style) || {};
  return {
    width: width || size || layoutStyle.width || defaultWidth,
    height: height || size || layoutStyle.height || defaultHeight,
  };
}

/**
 * 购物车相关设备类型参数
 */
export function getClientType(): string {
  if (isWechat) {
    return DEVICE_TYPE.wechat;
  }

  if (isIOS) {
    return DEVICE_TYPE.ios;
  }

  if (isAndroid) {
    return DEVICE_TYPE.android;
  }

  return DEVICE_TYPE.h5;
}

export function getTimestamp(timeStr) {
  const [Y1, Y2, Y3, Y4, M1, M2, D1, D2, H1, H2, m1, m2, s1, s2] = timeStr;

  return getTime(
    new Date(+`${Y1}${Y2}${Y3}${Y4}`, +`${M1}${M2}` - 1, +`${D1}${D2}`, +`${H1}${H2}`, +`${m1}${m2}`, +`${s1}${s2}`)
  );
}

/**
 * 计算目标时间与当前时间之间的间隔
 * @param target
 */
export function calculateTimeDiff(target) {
  const now: any = new Date();
  const endTime: any = new Date(target);
  const diff = endTime - now;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  return { days, hours, minutes, seconds };
}

/**
 * 折扣比例（0-100）格式化为折扣
 * 80 => 8
 * 75 => 7.5
 * @param percent
 */
export function formatPercent(percent) {
  const pointCount = percent % 10 === 0 ? 0 : 1;
  return (percent / 10).toFixed(pointCount);
}

/**
 * 将以元为单位的价格格式化为以分为单位的数字
 */
export function centFormat(price: string | number): any {
  if (typeof price === 'string' && price !== '') {
    return parseFloat((parseFloat(price) * 100).toFixed());
  }
  if (typeof price === 'number' && !Number.isNaN(price)) {
    return parseFloat((price * 100).toFixed());
  }
  return price;
}

/**
 * Round float numbers
 * @param value The number to be rounded
 * @param precision
 * @returns Rounded result number
 */
export function round(value, precision) {
  if (Number.isInteger(precision)) {
    const shift = 10 ** precision;
    // Limited preventing decimal issue
    return Math.round(value * shift + 0.00000000000001) / shift;
  }
  return Math.round(value);
}

export function formatHtmlString(content = '', { imgWidth = 0, imgFormat = true } = {}) {
  let str = '';
  if (imgFormat) {
    str = content
      .toString()
      .replace(/<br>/g, '')
      .replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, src) => {
        return `<img style="max-width: 100%;" src="${cdnPath({ src, width: (imgWidth || deviceWidth) - 24 })}">`;
      });
  }
  return str;
}

export function formatMessageData(message) {
  const contentObj = JSON.parse(message.content || '{}');
  const {
    noticeTemplate: { noticeTemplateMapping = [] },
  } = contentObj;

  function getFieldFromTempMapping(name) {
    return noticeTemplateMapping.find((it) => it.occupyName === name)?.value;
  }

  return {
    // 定义从 noticeTemplateMapping 取值的函数
    getFieldFromTempMapping,
    message: {
      ...message,
      ...contentObj,
    },
  };
}

export async function getAddressFromStorage() {
  const addressStr = await AsyncStorage.get(ADDRESS_STORAGE_KEY);
  if (addressStr) {
    const addressInfo = JSON.parse(addressStr);
    if (addressInfo && addressInfo.provinceId != null) {
      return addressInfo;
    }
  }

  return DEFAULT_ADDRESS;
}

/**
 * 请求参数对象压缩: 清除空的查询参数: `?timespan=&status=&canComment=1` 变成 `?canComment=1`
 *
 * @export
 * @param {*} query
 * @returns
 */
export function compressQuery(query) {
  Object.keys(query).forEach((k) => {
    // eslint-disable-next-line no-param-reassign
    !query[k] && delete query[k];
  });
  return query;
}

/**
 * 格式化日期
 * @param  date  时间戳／moment对象/Date对象等moment构造函数接收的类型
 * @param  type  time/day
 * @param  formatTemplate  自定义格式
 */
export function formatDate(date, type = 'time', formatTemplate = FORMAT.dTime) {
  if (!+date && +date !== 0) {
    return '';
  }
  let dateFormat = formatTemplate;
  switch (type) {
    case 'time':
      dateFormat = FORMAT.dTime;
      break;
    case 'day':
      dateFormat = FORMAT.dDate;
      break;
    default:
      dateFormat = formatTemplate || FORMAT.dTime;
      break;
  }

  return format(+date, dateFormat);
}

export function showConfirmDialog(title, remark, onOk, options) {
  const { okText = '确定', cancelText = '取消', onCancel = () => {}, activeOk, okTextStyle } = options || {};
  const okStyle = activeOk
    ? { color: '#fff', backgroundColor: themes.$primaryColor }
    : { color: themes.$primaryColor, backgroundColor: 'transparent' };
  const close = Modal.alert({
    title: Array.isArray(title) ? title[0] : title,
    remark: Array.isArray(remark) ? remark[0] : remark,
    actions: [
      {
        text: cancelText,
        onPress: () => {
          close();
          _isFun(onCancel) && onCancel();
        },
        style: activeOk ? {} : { color: themes.$activeColor },
      },
      {
        text: okText,
        onPress: () => {
          close();
          _isFun(onOk) && onOk();
        },
        style: { ...okStyle, ...okTextStyle },
      },
    ],
  });
}

export function errorModal(title, remark, onOk, options) {
  const { okText = '确定', activeOk } = options || {};
  const okStyle = activeOk
    ? { color: '#fff', backgroundColor: themes.$primaryColor }
    : { color: 'rgba(255, 136, 0, 1)', backgroundColor: 'transparent' };
  const close = Modal.alert({
    title,
    remark,
    actions: [
      {
        text: okText,
        onPress: () => {
          close();
          _isFun(onOk) && onOk();
        },
        style: okStyle,
      },
    ],
  });
}

export function successModal(title, remark, onOk, options) {
  const { okText = '确定', activeOk } = options || {};
  const okStyle = activeOk
    ? { color: themes.$primaryColor, backgroundColor: '#fff' }
    : { color: '#333', backgroundColor: 'transparent' };
  const close = Modal.alert({
    title,
    remark,
    actions: [
      {
        text: okText,
        onPress: () => {
          close();
          _isFun(onOk) && onOk();
        },
        style: okStyle,
      },
    ],
  });
}

/**
 * 上传组件错误处理映射
 */
export function onUploadError(error) {
  const errorMap = {
    'file type does not match': '上传图片类型错误',
    'file size exceeds limit': `图片应小于${UPLOAD_LIMIT_SIZE}M,请重新上传`,
    'upload failed': '上传失败',
  };
  // eslint-disable-next-line
  error.message ? errorModal('提示', errorMap[error.message], () => {}, { activeOk: true }) : console.log(error);
}

export function jumpTo({ title, path, host, action = 'navigate', failCallback }): any {
  if (URL_REG.test(path)) {
    // 如果是站内uri, 拿到pathname和参数跳转
    if (path.includes(host)) {
      let { pathname, search } = formatUrl(decodeURIComponent(path || ''));
      let params = getQueryData(search);
      // 如果是装修页(除开固定的几个path)，那么pathname应该是search中的path
      if (pathname === '/activity') {
        pathname = params?.path as string;
        search = '';
      }
      // 如果是跳过升级公告，则跳转到webView
      if (pathname === '/api/herd/app/inject/upgradeKey') {
        // ios的webView无法和rn共享cookie，直接发请求
        request(pathname + search);
        NavigationService.navigate('WebPage', { title, uri: path });
        return;
      }
      pathname = pathname === '/' ? '/index' : pathname;
      NavigationService[action]({ path: pathname + search });
      return;
    }
    NavigationService[action]('WebPage', { title, uri: path });
    return;
  }
  if (failCallback) {
    failCallback?.();
    return;
  }
  NavigationService[action]({ path });
}

/**
 *
 * @param userId
 * @param sharePathPrefix
 * @param shopId
 * @param itemId
 * @param categoryId
 * @param groupId 存在 分享拼团订单 不存在 分享商品详情
 */
export function getQrUrl({ userId, sharePathPrefix, itemId, shopId, orderId, categoryId, skuId }) {
  let qrUrl;
  if (orderId) {
    qrUrl = `${sharePathPrefix}/buyer/group/detail/${orderId}`;
  } else {
    const currentUrl = `${sharePathPrefix}/items/${itemId}/${skuId}/${shopId}`;
    const categoryIdVal = categoryId ? `&categoryId=${categoryId}` : '';
    qrUrl = userId ? `${currentUrl}?shareCode=${userId}:${itemId}${categoryIdVal}` : currentUrl;
  }
  return qrUrl;
}

export function formatImgOssPath(img) {
  return /^https?/.test(img) ? img : `https:${img}`;
}

/**
 * 手机号脱敏
 * @param mobile
 */
export function mobileWithSecret(mobile) {
  return mobile ? mobile.replace(/(\d{3})\d*(\d{4})/, '$1****$2') : mobile;
}

/**
 * 构造后端格式的省市区地址信息，最多4级
 * @param address
 * @param level
 */
export function getReceiveLocation(address, level = 3) {
  const addressKeys = ['province', 'city', 'region', 'street'];
  const addressInfo = address || {};

  let locationList = [];
  addressKeys.every((it, index) => {
    const currentLevel = index + 1;
    const currentLevelId = addressInfo[`${it}Id`];
    const currentLevelCode = addressInfo[`${it}Code`];
    const currentLevelName = addressInfo[it];

    if (currentLevel > level || currentLevelId == null) {
      return false;
    }

    locationList.push({
      id: currentLevelId,
      code: currentLevelCode,
      level: currentLevel,
      name: currentLevelName,
    });
    return true;
  });

  return { districtList: locationList };
}

/**
 * 构造后端格式的省市区地址信息
 * @param districtList
 */
export function getReceiveAddress(districtList) {
  const oProvince = _find(districtList, { level: 1 });
  const oCity = _find(districtList, { level: 2 });
  const oRegion = _find(districtList, { level: 3 });
  const oStreet = _find(districtList, { level: 4 });
  const provinceId = _get(oProvince, 'id', '');
  const province = _get(oProvince, 'name', '');
  const provinceCode = _get(oProvince, 'code', '');
  const cityId = _get(oCity, 'id', '');
  const city = _get(oCity, 'name', '');
  const cityCode = _get(oCity, 'code', '');
  const regionId = _get(oRegion, 'id', '');
  const region = _get(oRegion, 'name', '');
  const regionCode = _get(oRegion, 'code', '');
  const streetId = _get(oStreet, 'id', '');
  const street = _get(oStreet, 'name', '');
  const streetCode = _get(oStreet, 'code', '');
  return {
    province,
    city,
    region,
    street,
    provinceId,
    cityId,
    regionId,
    streetId,
    provinceCode,
    cityCode,
    regionCode,
    streetCode,
  };
}

/**
 * 解析6位地址编码，拿到provinceId, cityId, districtId
 * 解析规则：http://www.stats.gov.cn/tjsj/tjbz/200911/t20091125_8667.html
 * @param  {string} adcode
 */
export function formatAdCode(adcode = '') {
  if (!adcode) return {};
  const [province1, province2, city1, city2, region1, region2] = adcode;
  const provinceCode = `${province1}${province2}`;
  const cityCode = `${city1}${city2}`;
  const regionCode = `${region1}${region2}`;
  return {
    provinceId: `${provinceCode}`.padEnd(6, '0'),
    cityId: `${provinceCode}${cityCode}`.padEnd(6, '0'),
    regionId: `${provinceCode}${cityCode}${regionCode}`,
  };
}

// 与react-intl中的IntlMessageFormat format 不同：如果{xxx}是中文，不会导致后续操作阻塞
export function formatTemplateMessage(message: string, values: Record<string, any>) {
  if (!message) return message;
  return parse(message)
    .map(({ type, value }: any) => {
      if (type === 1) {
        return value in values ? values[value] ?? '' : `{${value}}`;
      }
      return value;
    })
    .join('');
}

export async function jumpToWxMiniProgram({ appId, path }) {
  if (isWxMp) {
    const wxCookies = await AsyncStorage.get('wx_cookies');
    Platform.API.navigateToMiniProgram({
      appId,
      envVersion: process.env.DICE_WORKSPACE === 'prod' ? 'release' : 'trial',
      path,
      extraData: {
        wx_cookies: wxCookies,
      },
    });
  }
}

export async function jumpInLogin({ authorizedRN, unauthorizedRN, authorizedParams = {}, unauthorizedParams = {} }) {
  if (authorizedRN) {
    await AsyncStorage.set(AUTHORIZED_FROM, JSON.stringify({ routeName: authorizedRN, params: authorizedParams }));
  }
  if (unauthorizedRN) {
    await AsyncStorage.set(
      UNAUTHORIZED_FROM,
      JSON.stringify({ routeName: unauthorizedRN, params: unauthorizedParams })
    );
  }
  NavigationService.navigate('Login');
}

export function getDistanceDisplay(distance) {
  if (distance) {
    if (distance >= 1) {
      return `${distance.toFixed(2)}km`;
    }
    return `${(distance * 1000).toFixed(2)}m`;
  }
  return '0m';
}
