/* eslint-disable @typescript-eslint/no-var-requires */
const { getDomain } = require('../helper');

module.exports = ({ router, options }) => {
  router.get('/api/herd/app/config', async (ctx) => {
    ctx.body = {
      success: true,
      data: ctx.herdContext._ENVIRONMENTS_CONFIG || {},
    };
  });

  router.get('/api/herd/change-language', async (ctx) => {
    const lng = ctx.request.header['accept-language'];
    ctx.cookies.set('lng', lng, {
      domain: getDomain(ctx.hostname, options),
      signed: false,
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    ctx.body = {
      success: true,
      data: true,
    };
  });

  router.get('/api/herd/app/upgrading', async (ctx) => {
    const { upgradeKey } = ctx.request.query;
    ctx.cookies.set('upgradingKey', upgradeKey, {
      domain: getDomain(ctx.hostname, options),
      signed: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    ctx.body = {
      success: true,
      data: true,
    };
  });
};
