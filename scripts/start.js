/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */

// 注入编译期环境变量
process.env.NODE_ENV = 'development';

const Koa = require('koa');
const morgan = require('koa-morgan');
const KoaRouter = require('koa-router');
const uploader = require('@terminus/koa2-file-upload');
const bodyparser = require('koa-bodyparser');
const webpack = require('webpack');
const koaConnect = require('koa2-connect');
const chalk = require('chalk');
const open = require('open');
const webpackDevConfig = require('../configs/webpack.dev');
const invoke = require('./server-lib/koa-invoke');
const koaProxy = require('./server-lib/koa-proxy');
const requireFile = require('./server-lib/require-file');
const defaultConfig = require('../configs/default-config');
const { getDevConfig, setEnv } = require('./helper');
const watchFile = require('./server-lib/watch-file');
const designConfig = require('../configs/webpack.design.dev');

const devConfig = getDevConfig();

let starting = false;
let httpServer = null;
let openBrowser = false;
let webpackDevMiddleware = null;
let webpackHotMiddleware = null;

if (!devConfig?.webpackDevMiddleware?.onlyServer) {
  if (devConfig?.webpackDevMiddleware?.design.enable) {
    watchFile(delayRestart, devConfig);
  }

  const webpackConfigs = [webpackDevConfig];

  if (devConfig?.webpackDevMiddleware?.design.enable) {
    webpackConfigs.push(designConfig);
  }

  const compiler = webpack(webpackConfigs);

  webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    writeToDisk: (filePath) => {
      return !/(assets|hot-update)/.test(filePath);
    },
  });

  webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: `/__webpack_hmr`,
    heartbeat: 1000,
    noInfo: true,
    overlay: false,
    name: 'app',
  });
}

async function startKoa(config) {
  const devServer = config.devServer;
  const { port = 3000, host, openBrowserOnDev } = devServer || {};
  const app = new Koa();
  starting = true;
  const origin = `http://${host}:${port}`;

  const { serverIndex, ssrOptions } = config;

  const beforeMiddleware = [];
  const addMiddleware = [];
  const router = new KoaRouter();

  /**
   * 文件监听处理
   *  service.js 和 design.js reload即可
   *  server文件夹应当整体reload
   */

  if (serverIndex && typeof serverIndex === 'string') {
    const filename = defaultConfig.resolve(`./${serverIndex}`);
    const servers = requireFile(filename);
    try {
      await servers({
        options: { ...config, selfUrl: config.selfUrl || `http://${devServer.host}:${port}` },
        router,
        useBeforeMiddleware: (middleware) => {
          beforeMiddleware.push(middleware);
        },
        useMiddleware: (middleware) => {
          addMiddleware.push(middleware);
        },
      });
    } catch (e) {
      console.log('如果打包未结束，请等待...');
      console.log(e.message);
      console.log(e.stack);
    }
  }

  // 监听配置变化重启服务
  let components = devConfig.designer.components;
  let services = devConfig.services;

  const newConfig = { ...config, design: { ...config.design, components }, services };

  if (webpackDevMiddleware) {
    console.log('[middleware Add dev server middleware]');
    app.use(koaConnect(webpackDevMiddleware));
  }

  if (webpackHotMiddleware) {
    console.log('[middleware Add hot reload middleware]');
    app.use(koaConnect(webpackHotMiddleware));
  }

  // 注册invoke
  console.log('[middleware Add invoke services]');
  invoke(app, newConfig);

  beforeMiddleware.forEach((middleware) => {
    app.use(middleware);
  });

  // api代理
  if (devServer.proxy?.enable) {
    console.log('[middleware] Add proxy middleware');
    koaProxy(
      app,
      devServer.proxy,
      config.upload.points.map(({ url }) => url)
    );
  }
  console.log('[middleware] Add morgan middleware');
  app.use(morgan('dev'));

  console.log('[middleware] Add bodyparser middleware');
  app.use(bodyparser());

  if (config.upload?.enable) {
    (config.upload?.points || []).forEach((uploadConfig) => app.use(uploader(uploadConfig)));
  }

  app.use(router.routes());
  app.use(router.allowedMethods());

  addMiddleware.forEach((middleware) => {
    app.use(middleware);
  });

  httpServer = app.listen(port, () => {
    console.log(`\nlisten port ${port}`);
    console.log(`[web site]: ${chalk.green.bold(origin)} \n`);
    if (openBrowserOnDev && !openBrowser && !devConfig?.webpackDevMiddleware?.onlyServer) {
      open(origin);
      openBrowser = true;
    }
  });
  starting = false;
  return { httpServer, app };
}

async function restartKoa(config) {
  console.log(`[web server]: ${chalk.red.bold('重启服务')} \n`);
  if (httpServer) {
    httpServer.close();
    httpServer = null;
  }
  try {
    await startKoa(config);
  } catch (e) {
    console.log(e.message);
    console.log(e.stack);
    delayRestart(config, 5000);
  }
}

let timer = null;
// 延时触发重启
function delayRestart(config, time = 500) {
  if (starting) {
    return;
  }
  clearTimeout(timer);
  timer = setTimeout(() => {
    try {
      restartKoa(config);
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      delayRestart(config, 5000);
    }
  }, time);
}

startKoa(devConfig);
