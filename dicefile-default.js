/* eslint-disable */
const _ = require('lodash');
const path = require('path');

const defaultMap = {
  lshmPrefix: process.env.LSHM_PREFIX,
  ucPrefix: process.env.UC_PREFIX,
  aclPrefix: process.env.ACL_PREFIX,
  ugPrefix: process.env.UG_PREFIX,
  tradePrefix: process.env.TRADE_PREFIX,
  tradeFuncPrefix: process.env.TRADE_FUNC_PREFIX,
  storePrefix: process.env.STORE_PREFIX,
};

const defaultDev = {
  lshmPrefix: 'https://testobworkwx.hnlshm.com',
  ucPrefix: 'https://uc-dev.noprod.hnlshm.com',
  aclPrefix: 'https://uc-dev.noprod.hnlshm.com',
  ugPrefix: 'http://web-dev.data.noprod.hnlshm.com',
  tradePrefix: 'http://web-dev.data.noprod.hnlshm.com',
  tradeFuncPrefix: 'http://web-dev.data.noprod.hnlshm.com',
  storePrefix: 'http://web-dev.data.noprod.hnlshm.com',
};

const defaultTest = {
  lshmPrefix: 'https://testobworkwx.hnlshm.com',
  ucPrefix: 'https://uc-dev.noprod.hnlshm.com',
  aclPrefix: 'https://uc-dev.noprod.hnlshm.com',
  ugPrefix: 'http://web-dev.data.noprod.hnlshm.com',
  tradePrefix: 'http://web-dev.data.noprod.hnlshm.com',
  tradeFuncPrefix: 'http://web-dev.data.noprod.hnlshm.com',
  storePrefix: 'http://web-dev.data.noprod.hnlshm.com',
};

const defaultStaging = {
  lshmPrefix: 'https://testobworkwx.hnlshm.com',
  ucPrefix: 'https://uc-dev.noprod.hnlshm.com',
  aclPrefix: 'https://uc-dev.noprod.hnlshm.com',
  ugPrefix: 'https://marketing-test-swagger.app.terminus.io',
  tradePrefix: 'https://marketing-test-swagger.app.terminus.io',
  tradeFuncPrefix: 'https://marketing-test-swagger.app.terminus.io',
  storePrefix: 'https://marketing-test-swagger.app.terminus.io',
};

const defaultProd = {
  lshmPrefix: 'https://testobworkwx.hnlshm.com',
  ucPrefix: 'https://uc-dev.noprod.hnlshm.com',
  aclPrefix: 'https://uc-dev.noprod.hnlshm.com',
  ugPrefix: 'https://marketing-test-swagger.app.terminus.io',
  tradePrefix: 'https://marketing-test-swagger.app.terminus.io',
  tradeFuncPrefix: 'https://marketing-test-swagger.app.terminus.io',
  storePrefix: 'https://marketing-test-swagger.app.terminus.io',
};

const SERVICE_MAP = {
  dev: _.defaults({}, defaultMap, defaultDev),
  test: _.defaults({}, defaultMap, defaultTest),
  staging: _.defaults({}, defaultMap, defaultStaging),
  prod: _.defaults({}, defaultMap, defaultProd),
};

console.log('services: ', SERVICE_MAP[process.env.DICE_WORKSPACE || 'dev']);

const options = {
  port: 8081,
  selfUrl: process.env.SELF_URL,
  useEnv: process.env.DICE_WORKSPACE,
  services: require('./server/config/service'),
  serviceConfig: (services, selfUrl, useEnv = 'dev') => {
    _.each(services, (service) => {
      const { url, type = 'http' } = service;
      const apiPrefixMapping = {
        '/api/herd': selfUrl,
      };
      if (type.toLowerCase() === 'http') {
        service.type = 'http';
        let mathPrefix = '/api/herd';
        const hasMatchPrefix = (p) => {
          const match = url.startsWith(p);
          if (match) {
            mathPrefix = p;
          }
          return match;
        };
        if (Object.keys(apiPrefixMapping).some(hasMatchPrefix)) {
          service.url = `${apiPrefixMapping[mathPrefix]}${url}`;
          return;
        }
        service.url = `${selfUrl}${url}`;
      }
    });
    return services;
  },
};

module.exports = (opts) => {
  _.defaultsDeep(opts, options);
  const selfUrl = opts.selfUrl || `http://127.0.0.1:${opts.port}`;
  if (!opts.useEnv) {
    opts.useEnv = 'dev';
  }

  return {
    selfUrl,
    port: opts.port,
    auth: { enable: false },
    csrf: { enable: false },
    root: opts.root || __dirname,
    extension: path.resolve(__dirname, 'server/index'),
    proxy: {
      enable: true, // default is false
      changeOrigin: true,
      router: [
        { match: '/gateway/(.+)', to: SERVICE_MAP[opts.useEnv].lshmPrefix },
        { match: '/api/user/(.+)', to: SERVICE_MAP[opts.useEnv].ucPrefix },
        { match: '/api/qywx/acl/(.+)', to: SERVICE_MAP[opts.useEnv].aclPrefix },
        { match: '/api/trade/(.+)', to: SERVICE_MAP[opts.useEnv].tradePrefix },
        { match: '/api/trantor/(flow|func)/ug_(.+)', to: SERVICE_MAP[opts.useEnv].ugPrefix },
        { match: '/api/trantor/(flow|func)/store_center_(.+)', to: SERVICE_MAP[opts.useEnv].storePrefix },
        { match: '/api/trantor/(flow|func)/trade_center_(.+)', to: SERVICE_MAP[opts.useEnv].tradeFuncPrefix },
      ],
    },
    // Services
    services: opts.serviceConfig(opts.services, selfUrl, opts.useEnv),
    invokers: {
      timeout: 10000, // 默认值为 1000 ms
      unwrap: (res) => {
        const respData = res.data || res.result || res.res;
        if (res.success && respData != null) {
          return respData;
        }
        return res;
      }, // 默认为 true ，也可以为一个 function 去支持自定义的 unwrapResponse
    },
    upload: {
      enable: process.env.OSS_ENABLE !== 'false', // 需要oss时将此项改为true
      points: [
        {
          url: '/api/herd/files/upload',
          mimetypes: ['image/png', 'image/bmp', 'image/jpeg', 'image/gif', 'image/jpg', 'application/octet-stream'], // application/octet-stream为了兼容微信小程序
          bucket: process.env.OSS_BUCKET,
          provider: process.env.OSS_PROVIDER || 'oss',
          storeDir: process.env.OSS_STORE_DIR,
          region: process.env.OSS_REGION,
          targetHost: process.env.OSS_HOST || process.env.OSS_FRONT_HOST, // default null, 文件的访问地址host,该项配置只对装修上传图片接口有效
          endpoint: process.env.OSS_ENDPOINT, // 通常情况下是不需要这项配置的。如果服务器访问不了80端口，可以增加此配置，通过代理去访问oss服务器
          targetProtocol: process.env.OSS_TARGET_PROTOCOL || 'https', // default null , 文件的访问地址协议,该项配置只对装修上传图片接口有效
          accessKeyId: process.env.OSS_ACCESS_KEY_ID || process.env.OSS_ACCESS_KEY,
          accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || process.env.OSS_ACCESS_SECRET,
          roleArn: process.env.OSS_ROLE_ARN,
          roleSessionName: process.env.ROLE_SESSION_NAME,
        },
      ],
    },
    envs: {},
  };
};
