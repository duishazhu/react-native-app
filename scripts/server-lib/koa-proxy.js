/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const HTTP = require('http');
const HTTPS = require('https');
const Router = require('koa-router');
const httpProxy = require('http-proxy');
const _isRegExp = require('lodash/isRegExp');
const { pathToRegexp } = require('path-to-regexp');

const agent = {
  http: new HTTP.Agent({
    keepAlive: true,
  }),
  https: new HTTPS.Agent({
    keepAlive: true,
    rejectUnauthorized: false,
  }),
};

function koaProxy(app, options, exclude = []) {
  const excludes = (Array.isArray(exclude) ? exclude : [exclude]).map((pt) => pathToRegexp(pt, null, { end: false }));

  function isExclude(url) {
    return excludes.some((reg) => reg.test(url));
  }

  // 使用router做代理的匹配
  const router = new Router();
  if (options?.router) {
    options?.router?.forEach((proxyConfig) =>
      setProxy(router, { changeOrigin: options?.changeOrigin, ...proxyConfig })
    );
  }
  app.use(async (ctx, next) => {
    if (isExclude(ctx.path)) {
      return await next();
    }
    return router.routes()(ctx, next);
  });
  app.use(async (ctx, next) => {
    if (isExclude(ctx.path)) {
      return await next();
    }
    return router.allowedMethods()(ctx, next);
  });
}

function setProxy(koaRouter, proxyConfig) {
  const { onProxyReq, onProxyRes, match, to, ...createProxy } = proxyConfig;
  const proxyInstance = httpProxy.createProxy({
    xfwd: true,
    preserveHeaderKeyCase: true,
    agent: to.startsWith('https') ? agent.https : agent.http,
    target: to,
    ...createProxy,
  });

  // 如果有body把body发出去
  proxyInstance.on('proxyReq', (proxyReq, req) => {
    if (req.body) {
      proxyReq.write(req.body);
    }
  });
  // Error: socket hang up处理一下
  proxyInstance.on('error', (err, req) => {
    console.log(`代理异常：${err.code}   ${req.method}: ${req.url}（通常是频繁强制刷新页面所致）`);
  });

  if (onProxyReq) {
    proxyInstance.on('proxyReq', onProxyReq);
  }

  if (onProxyRes) {
    proxyInstance.on('proxyRes', onProxyRes);
  }

  const path = _isRegExp(match) ? match : new RegExp(match);
  koaRouter.all(path, (ctx, next) => {
    // 如不想使用 Koa 内置的 response 处理方法，可以设置 ctx.respond = false;。这时你可以自己设置原始的 res 对象来处理响应。
    ctx.respond = false;
    const req = ctx.req;
    const koaReq = ctx.request;
    if (ctx.body) {
      next();
      return;
    }
    if (req.method.toUpperCase !== 'GET') {
      req.body = koaReq.rawBody;
    }
    try {
      console.log(`${ctx.method} ${ctx.path} -> ${proxyConfig.to}`);
      proxyInstance.web(req, ctx.res);
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      ctx.res.status = 500;
      ctx.res.end(e.message);
    }
  });
}

module.exports = koaProxy;
