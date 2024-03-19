/* eslint-disable @typescript-eslint/no-var-requires */
const send = require('koa-send');
const path = require('path');
const isIgnorePath = require('./utils/is-ignore-path');

module.exports = async function ({ options }) {
  const {
    root,
    envs: { sourceName },
  } = options;

  return async function (ctx, next) {
    const { path: requestPath, method } = ctx;
    if (method !== 'GET' || (method === 'GET' && requestPath === '/__webpack_hmr')) {
      await next();
      return;
    }

    if (requestPath.startsWith('/favicon.ico')) {
      await send(ctx, 'public/assets/images/favicon.ico', { root });
      return;
    }

    if (isIgnorePath(requestPath)) {
      await next();
      return;
    }

    await send(ctx, 'public/index.html', { root });
  };
};
