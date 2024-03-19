/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const defaultConfig = require('./dicefile-default');

/* eslint-disable no-param-reassign */
module.exports = (opts) => {
  const { host, port, openBrowserOnDev } = opts?.devServer || {};
  const options = defaultConfig({
    port: opts?.port || 3000,
    ...opts,
  });

  const { proxy, upload, invokers, services, ...otherOptions } = options || {};
  return {
    devServer: {
      proxy,

      /**
       * host
       * Type: String
       * Default: localhost
       * Required
       */
      host: host || 'localhost',

      /**
       * port
       * Type: Integer
       * Default: 3000
       * Required
       */
      port: port || 3000,

      /**
       * 开发模式下 npm start 时打开浏览器
       */
      openBrowserOnDev: openBrowserOnDev || true,
    },

    upload,

    webpackDevMiddleware: {
      enable: false,
      // 装修器打包
      design: {
        /**
         * 默认不开启
         * 如需要进入装修器，装修页面需手动开启
         * 装修好的页面无需开启此功能即可正常运行
         * 请在 dev.config.js 中设置
         */
        enable: false,
        // 监听装修器打包。
        watch: true,
      },
    },

    invokers,
    // 相对于项目的目录路径
    services,
    serverIndex: 'server/index',
    ...otherOptions,

    // 始终要指向项目根目录，如果copy到外面注意修改
    root: path.resolve(__dirname, './'),
  };
};
