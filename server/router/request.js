/* eslint-disable @typescript-eslint/no-var-requires */
// 编译的 utils/request
const fetch = require('isomorphic-fetch');
const { stringify } = require('querystring');

const header = {
  pragma: 'no-cache',
  Accept: 'application/json',
  'device-type': 'H5',
  'source-type': 'xuexi',
  'cache-control': 'no-cache',
  'x-requested-with': 'XMLHttpRequest',
};

const configs = {
  method: 'get',
  cache: 'no-cache',
  credentials: 'include',
};

async function request(url, options = {}) {
  const { headers = {}, data = '', quiet = false, useUnwrap = true, ctx = {}, ...others } = options || {};
  const { req } = ctx;
  const requestOption = { headers: { ...header, ...headers }, ...configs, ...others };

  if (req && req.headers) {
    // tooken 逻辑 next-line
    let cookie = req.headers.cookie || '';
    const chtkCookieStr = `chtk=${ctx.chtk}`;
    if (!cookie.includes('chtk')) {
      cookie = cookie.length ? `${cookie}; ${chtkCookieStr}` : chtkCookieStr;
    } else if (!cookie.includes(chtkCookieStr)) {
      cookie = cookie.replace(/chtk\=[^;]+/g, chtkCookieStr);
    }
    requestOption.headers = { ...requestOption.headers, ...req.headers, cookie };
  }

  let requestUrl = `${ctx.selfUrl || ''}${url}`;
  if (data) {
    if (requestOption.method.toLowerCase() === 'get') {
      requestUrl = `${requestUrl}${url.includes('?') ? '&' : '?'}${typeof data === 'string' ? data : stringify(data)}`;
    } else if (typeof data === 'string') {
      requestOption.body = data;
    } else {
      requestOption.headers['Content-Type'] = 'application/json; charset=UTF-8';
      requestOption.body = JSON.stringify(data);
    }
  }

  const response = await fetch(requestUrl, requestOption);
  const contentType = response.headers.get('content-type');
  const dataType =
    contentType != null && contentType.split(';')[0] === 'application/json' ? 'json' : options.dataType || 'text';
  const status = response.status;

  const resData = await getResponseData(response, dataType);
  if (!useUnwrap) {
    return resData;
  }
  if (isGetError(status, resData, url)) {
    // 如果设置了提示
    const msg = typeof resData === 'object' ? resData.error || resData.message : resData;
    const error = new Error(msg);
    error.data = resData;
    error.response = response;
    throw error;
  }
  return unwrapper(resData);
}

// eslint-disable-next-line consistent-return
function isGetError(status, resData = { success: false }, url) {
  if (status < 200 || status >= 300) {
    return true;
  }
  if (!resData.success && !url.startsWith('/api/design')) {
    return true;
  }
}

// 将相应数据转换
async function getResponseData(response, dataType) {
  if (dataType === 'json') {
    try {
      const json = await response.json();
      return json;
    } catch (e) {
      const text = await response.text();
      console.error('The response is not json');
      // if (!quiet) message.error(response.statusText);
      return text;
    }
  }
  if (dataType === 'buffer') {
    return await response.buffer();
  }
  return await response.text();
}

function unwrapper(data) {
  const respData = (data && (data.data || data.res)) || undefined;
  if (data && data.success && respData !== undefined) {
    return respData;
  }
  return data;
}

module.exports = request;
