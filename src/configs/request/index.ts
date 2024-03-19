import isPlainObject from 'lodash/isPlainObject';
import { request, formatUrl } from '@terminus/mall-utils';
import { AsyncStorage, Toast } from '@terminus/nusi-mobile';
import RequestError from 'configs/request/error';
import { unauthorized } from 'utils/unauthorized';
import SessionManage from 'utils/track-session-store';

const _DEV_ = process.env.DICE_WORKSPACE !== 'PROD';
const userCookieKey = process.env.USER_COOKIE_KEY;

// request相关的配置，解包，错误处理
export const requestCommonConfig = {
  // timeout: 30 * 1000,
  onReceive: async (data, response, options) => {
    SessionManage.updateSessionId();

    const { status } = response;

    if (_DEV_) {
      console.log('🚀', options.method || 'GET', formatUrl(options.url).pathname, status);
      options.data && console.log('Request', options.data);
      console.log('Response', data);
    }

    if (status < 200 || status >= 300) {
      throw new RequestError(data?.code ?? 'request.failed', request.getMessage(data, '请求响应异常'));
    }

    const setCookie = response.headers.get('set-cookie');
    if (setCookie?.includes?.(userCookieKey)) {
      const cookies = setCookie.split('; ');
      const userCookieValue = cookies.find((item) => item.includes(userCookieKey)).split('=')[1];
      await AsyncStorage.set('Token', userCookieValue);
    }

    // ignoreJudgeSuccess=true不检查返回值, 默认是false
    // 部分接口比如图片上传, 返回接口里没有success字段
    if (!options?.ignoreJudgeSuccess && data && !data.success) {
      throw new RequestError(data?.code ?? 'request.failed', request.getMessage(data, '响应异常'));
    }
  },
  convertData: (data, response, options) => {
    // ignoreConvertData=true不处理data返回值, 默认是false
    if (!options?.ignoreConvertData && isPlainObject(data)) {
      return data.data ?? data.result ?? data.res;
    }
    return data;
  },
  onError(e, response, options) {
    if (options.quiet || options.options?.quiet || response.status === 401) {
      return;
    }
    Toast.info(e.message);
  },
  onUnauthorized: unauthorized,
};
