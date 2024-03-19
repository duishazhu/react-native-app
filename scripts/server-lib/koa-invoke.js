/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const _ = require('lodash');
const Log = require('@terminus/log');

process.log = new Log('info');

const preFormatParams = (config) => {
  if (config?.payload?.length || config?.query?.length) {
    const queryArr = [];
    (config.payload || config.query).forEach((query) => {
      if (typeof query === 'string') {
        queryArr.push({ name: query, target: query });
      } else {
        queryArr.push({ ...query, name: query.name, target: query.target || query.name });
      }
    });
    if (config?.payload) {
      config.payload = queryArr;
    } else {
      config.query = queryArr;
    }
  }
};

module.exports = function (app, opts) {
  const invokers = require('@terminus/invokers');
  const services = opts.services;

  /**
   * invokeService 默认取target 给 name 赋值
   */
  Object.keys(services).forEach((key) => {
    const server = services[key];
    preFormatParams(server);
  });

  invokers.init({
    filter: undefined,
    options: opts.invokers,
    services,
    unwrap: opts.unwrapResponse,
  });
  app.use(async (ctx, next) => {
    const { req } = ctx;
    const i18nLng = ctx.i18n && ctx.i18n.lng;

    const builtIn = {
      __INVOKER_HEADER__: _.pickBy(
        {
          Cookie: ctx.header.cookie,
          'Accept-Language': i18nLng || 'zh-CN',
          'x-forwarded-for':
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress,
          'x-request-id': ctx.header['x-request-id'],
        },
        (value) => value != null
      ),
    };

    ctx.herdContext = Object.assign(ctx.herdContext || {}, builtIn);

    // 直接往 ctx 中注入一个 invokeService 方法，简化对 invokers 的调用
    ctx.invokeService = (serviceKey, context = {}, option = {}) => {
      // TODO: 因为主搜和店搜用的是同一个组件不通的接口，所以这里判断了如果是店搜的话给url拼上一个字符串
      if (serviceKey === 'getSearchResult' && context.shopId) {
        context.urlExtra = 'shop/';
      } else {
        context.urlExtra = '';
      }

      return invokers.call(serviceKey, { ...builtIn, ...context }, option);
    };

    await next();
  });
};
