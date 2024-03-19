/* eslint-disable no-useless-escape */
import { Dimensions, StatusBar, Platform } from 'react-native';

import { defineMessage } from 'utils/react-intl';
import { isIphoneX, isWxMp, isAndroidMp, isMp } from 'utils/platform';

export const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

export const androidStatusBarHeight = StatusBar.currentHeight || 0;

// 获取安全区域到顶部距离
let topInset = -1;
export const SafeTopInset = (() => {
  if (topInset < 0) {
    const systemInfo = isMp ? Platform.API.getSystemInfoSync() : {};
    topInset = Platform.select({
      wx: systemInfo.statusBarHeight,
      alipay: systemInfo.statusBarHeight,
      android: androidStatusBarHeight,
      ios: isIphoneX() ? 44 : 20,
      web: 0,
    });
  }
  return topInset || 0;
})();

// ios 部分机型 left 取到的值为0，因此 ios 暂固定值，android仍用api获取计算
// eslint-disable-next-line no-nested-ternary
export const MenuButtonOffset = isWxMp
  ? isAndroidMp
    ? deviceWidth - Platform.API.getMenuButtonBoundingClientRect().left
    : 94
  : 0;

export const TEXT_LENGTH_REG = /^.{1,25}$/;
export const MOBILE_NUMBER_REG = /^1[3-9]\d{9}$/;
export const MOBILE_SMS_REG = /^\d{6}$/;
export const EMAIL_REG = /^([a-zA-Z0-9_-]|\.)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const EMAIL_SMS_REG = /^\d{6}$/;
export const IMG_CAPTCHA_REG = /^\w{5}$/;
export const TAX_NUMBER_REG = /^[A-Z0-9]{15}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
export const USER_NAME_REG = /^[\d_a-zA-Z\u4E00-\u9FA5]{2,25}$/;
export const DETAIL_ADDRESS_REG = /^[\s\S]{1,120}$/;
// eslint-disable-next-line
export const PASSWORD_REG =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`·！……（）——+《》？“：「」】【、￥!,@#$%^&*?_\\>\\<\~\;\:\=\[\]\{\}\(\)\+\\\/\?\.\|\-])[A-Za-z\d`·！……（）——+《》？“：「」】【、￥!,@#$%^&*?_\\>\\<\~\;\:\=\[\]\{\}\(\)\+\\\/\?\.\|\-]{6,16}$/;
export const NUMBER_REG = /^[0-9]+$/;
export const URL_REG = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
export const HTML_TAG_REG = /<[^>]+>/gi; // 匹配所有html标签
export const priceUnit = '元';
export const virtualCoinUnit = '新豆';

export const UPLOAD_URL = '/api/herd/files/upload';
export const UPLOAD_LIMIT_SIZE = 5;
export const ID_CARD_REG =
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;

// Channel枚举应与 后端接口payChannels字段对应
// 收银台、支付结果页使用
export const PAY_CHANNEL_ENUM = {
  MOCKPAY: 'MOCKPAY', // 模拟支付
  ALIPAY_APP: 'ALIPAY_APP', // 支付宝app支付
  WECHATPAY_APP: 'WECHATPAY_APP', // 微信app支付
  UNIONPAY_APP: 'UNIONPAY_APP', // 银联 app 支付

  ALIPAY_WAP: 'ALIPAY_WAP', // 支付宝WAP支付
  WECHATPAY_H5: 'WECHATPAY_H5', // 微信H5支付 (非微信环境 h5 微信支付方式)
  WECHATPAY_JSAPI: 'WECHATPAY_JSAPI', // 微信 JSAPI 支付（微信环境 h5 支付方式）
  UNIONPAY_WAP: 'UNIONPAY_WAP', // 银联 wap 支付

  WECHATPAY_WXAPP: 'WECHATPAY_WXAPP', // 小程序微信支付
};

// 支付渠道名称
export const PAY_CHANNEL_NAME = {
  MOCKPAY: defineMessage({ id: 'trade.pay.simulatedPayment', defaultMessage: '模拟支付' }), // 模拟支付
  ALIPAY_APP: defineMessage({ id: 'trade.pay.Alipay', defaultMessage: '支付宝' }), // 支付宝app支付
  WECHATPAY_APP: defineMessage({ id: 'trade.pay.wechatPay', defaultMessage: '微信支付' }), // 微信app支付
  UNIONPAY_APP: defineMessage({ id: 'trade.pay.cloudQuickPass', defaultMessage: '云闪付' }), // 银联 app 支付

  ALIPAY_WAP: defineMessage({ id: 'trade.pay.Alipay', defaultMessage: '支付宝' }), // 支付宝WAP支付
  WECHATPAY_H5: defineMessage({ id: 'trade.pay.wechatPay', defaultMessage: '微信支付' }), // 微信H5支付 (非微信环境 h5 微信支付方式)
  WECHATPAY_JSAPI: defineMessage({ id: 'trade.pay.wechatPay', defaultMessage: '微信支付' }), // 微信 JSAPI 支付（微信环境 h5 支付方式）
  UNIONPAY_WAP: defineMessage({ id: 'trade.pay.cloudQuickPass', defaultMessage: '云闪付' }), // 银联 wap 支付

  WECHATPAY_WXAPP: defineMessage({ id: 'trade.pay.wechatPay', defaultMessage: '微信支付' }), // 小程序微信支付
};

export const FORMAT = {
  sDateMD: 'MM/dd',
  sDate: 'yyyy/MM/dd', // Separate by slash
  dDate: 'yyyy-MM-dd', // Separate by dash
  tDate: 'yyyy.MM.dd', // Separate by dot
  hDate: 'yyyy-MM-dd HH',
  mDate: 'yyyy-MM-dd HH:mm',
  cnDate: 'yyyy年MM月dd日',
  cnTime: 'yyyy年MM月dd日 HH:mm:ss',
  timezone: 'Asia/Shanghai',
  time: 'yyyy/MM/dd HH:mm:ss',
  tTime: 'yyyy.MM.dd HH:mm:ss',
  dTime: 'yyyy-MM-dd HH:mm:ss',
};

// 默认地址
export const DEFAULT_ADDRESS = {
  provinceId: 110000,
  cityId: 110100,
  regionId: 110105,
  streetId: 11010500100,
  provinceCode: 'CODE110000',
  cityCode: 'CODE110100',
  regionCode: 'CODE110105',
  streetCode: 'CODE11010500100',
  // streetId: 110105001,
  province: '北京',
  city: '北京市',
  region: '朝阳区',
  street: '建外街道',
};
// 地址层级，从大范围到小范围
export const ADDRESS_PARAM_PREFIX = ['province', 'city', 'region', 'street'];
// 地址 key
export const ADDRESS_STORAGE_KEY = 'addressObj';

// area-code-mobile 手机区号key
// 手机区号会有重复的，需要单独把地区名称存起来
export const AREA_STORAGE_KEY = 'countryCode';
// CN-中国-86---适用于国内版
// US-美国-1 ===海外版
export const DEFAULT_AREA_CODE_MOBILE = {
  key: 'CN',
  value: 86,
};

// 设备类型
export const DEVICE_TYPE = {
  h5: 'H5',
  ios: 'IOS',
  android: 'ANDROID',
  wechat: 'WECHAT',
};

// 类似排行榜组件装修页面路径前缀
export const RANKING_DESIGN_PAGE_PREFIX = '/ranking/';

// 店铺装修页面前缀 如 /shops/12006 path.match(reg)后第二个数组为shopId （可改，目前activity用到）
export const SHOP_DESIGN_PAGE_REG = /^\/shops\/(\d+)/;

export const forceShowGuide = true;
export const forceShowPrivacy = true;

// 获取安全区域到底部距离
let bottomInset = -1;
export const SafeBottomInset = (() => {
  if (bottomInset < 0) {
    const systemInfo = isMp ? Platform.API.getSystemInfoSync() : { safeArea: {} };
    console.log('❗️❗️❗️ ~ file: constants.js:157 ~ SafeBottomInset ~ systemInfo:', systemInfo);
    bottomInset = Platform.select({
      wx: systemInfo.screenHeight - systemInfo.safeArea.bottom,
      alipay: systemInfo.screenHeight - systemInfo.safeArea.bottom,
      android: 0,
      ios: isIphoneX() ? 34 : 0,
      web: 0,
    });
  }
  return bottomInset;
})();

// B2C各个业态下装修默认业态
export const BUSINESS_TYPE = {
  BUSINESS_CE: 'ce',
};

// 当前业态下默认业态，用于装修
export const INITIAL_BUSINESS_TYPE = BUSINESS_TYPE.BUSINESS_CE;

// 活动引擎排序值
export const CAMPAIGN_ENGINE_ORDER = {
  pointQty: 'pointQty', // 积分
  expQty: 'expQty', // 成长值
  curJoinCampaignQty: 'curJoinCampaignQty', // 人数
};

// 活动引擎排序列表
export const CAMPAIGN_ENGINE_ORDER_LIST = [
  { name: '不限', value: undefined },
  { name: '积分', value: CAMPAIGN_ENGINE_ORDER.pointQty },
  { name: '成长值', value: CAMPAIGN_ENGINE_ORDER.expQty },
  // { name: '人数', value: CAMPAIGN_ENGINE_ORDER.curJoinCampaignQty },
];

// 活动引擎状态值
export const CAMPAIGN_ENGINE_STATUS = {
  active: 'ACTIVE', // 积分
  soonBegin: 'SOON_BEGIN', // 即将开始
};

// 活动引擎状态列表
export const CAMPAIGN_ENGINE_STATUS_LIST = [
  { name: '进行中', value: CAMPAIGN_ENGINE_STATUS.active },
  { name: '即将开始', value: CAMPAIGN_ENGINE_STATUS.soonBegin },
];

// 活动引擎过滤类型
export const CAMPAIGN_ENGINE_FILTER_TYPE = {
  engine: 'engine', // 引擎名称过滤
  status: 'status', // 引擎状态过滤
  order: 'order', // 引擎排序过滤
};

export const AUTHORIZED_FROM = 'authorized_from';
export const UNAUTHORIZED_FROM = 'unauthorized_from';

// 等级提升方式
export const UP_CONDITION_TYPE = {
  maxAmount: 'MAX_AMOUNT', // 单笔最高消费金额
  tradeTimes: 'TRADE_TIMES', // 消费金额
  sumAmount: 'SUM_AMOUNT', // 累计消费金额
  sumExperience: 'SUM_EXPERIENCE', // 成长值
};

// 等级提升方式 字典
export const UP_CONDITION_TYPE_DICT = {
  [UP_CONDITION_TYPE.maxAmount]: '单笔最高消费金额',
  [UP_CONDITION_TYPE.tradeTimes]: '消费金额',
  [UP_CONDITION_TYPE.sumAmount]: '累计消费金额',
  [UP_CONDITION_TYPE.sumExperience]: '成长值',
};

// 等级展示方式
export const CONDITION_DISPLAY_TYPE = {
  single: 'SINGLE',
  multi: 'MULTI',
};

export const NO_DIFF = 'NO_DIFF';

export const POINT_TYPE = {
  platform: 'PLATFORM', // 平台积分
  merchant: 'MERCHANT', // 商家积分
};

export const PROMOTION_TYPE_MAP = {
  SECKILL: '秒杀',
  GROUP_PURCHASING: '拼团',
};
