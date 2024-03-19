import { Platform, Dimensions } from 'react-native';
import PlatformApi from 'utils/platform-api';

const { platform: mpPlatform } = PlatformApi.get('getSystemInfoSync') || {};

const navigator = typeof window !== 'undefined' ? window.navigator : { userAgent: '' };

export const isWeb = Platform.OS === 'web';

export const isWxMp = Platform.OS === 'wx';

export const isWxWebview =
  window?.__wxjs_environment === 'miniprogram' ||
  window?.navigator?.userAgent?.toLowerCase?.()?.indexOf?.('miniprogram') > -1;

export const isAndroidMp = mpPlatform === 'android';

export const isMp = Platform.OS === 'wx' || Platform.OS === 'alipay';

// 微信小程序
export const isWechatMP = (Platform.OS as string) === 'wx';

// 支付宝小程序
export const isAlipayMP = (Platform.OS as string) === 'alipay';

export const isIOS = Platform.OS === 'ios';

export const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

export const isAndroid = Platform.OS === 'android';

export const isAndroidWeb = /Android|Adr/.test(navigator.userAgent);

// 机型是否晚于 iPhoneX
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export const isWechat = /MicroMessenger/i.test(navigator.userAgent);

export const isDingtalk = /DingTalk/i.test(navigator.userAgent);

export const isAndroidWechat = /MicroMessenger/i.test(navigator.userAgent) && isAndroidWeb;

export const isIosWechat = /MicroMessenger/i.test(navigator.userAgent) && /iP(ad|od|hone)/i.test(navigator.userAgent);

export const notTerminusWeb = isWeb && !/terminus/i.test(navigator.userAgent);

export const isIosWeb = isWeb && /iP(ad|od|hone)/i.test(navigator.userAgent);

export const isSafariMobile =
  /iP(ad|od|hone)/i.test(navigator.userAgent) &&
  /WebKit/i.test(navigator.userAgent) &&
  !/(CriOS|FxiOS|OPiOS|mercury)/i.test(navigator.userAgent);

export const getChannel = () => {
  if (isWechat) {
    return 'WECHAT';
  }
  if (isAndroid) {
    return 'ANDROID';
  }
  if (isIOS) {
    return 'IOS';
  }
  return 'H5';
};
