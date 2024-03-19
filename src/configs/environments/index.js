export const environments = [
  {
    id: 'dev',
    name: '开发环境',
  },
  {
    id: 'test',
    name: '测试环境',
    default: true,
  },
  {
    id: 'staging',
    name: '预发环境',
  },
  {
    id: 'prod',
    name: '生产环境',
  },
];

export const envConfigsMap = {
  dev: {
    url: process.env.FRONTEND_DOMAIN || 'https://wap-dev-store.noprod.hnlshm.com',
  },
  test: {
    url: process.env.FRONTEND_DOMAIN || 'https://wap-test-store.noprod.hnlshm.com',
  },
  staging: {
    url: process.env.FRONTEND_DOMAIN || 'https://wap-staging-store.noprod.hnlshm.com',
  },
  prod: {
    url: process.env.FRONTEND_DOMAIN || 'https://h5-mbr-mix-prod.app.terminus.io',
  },
};
