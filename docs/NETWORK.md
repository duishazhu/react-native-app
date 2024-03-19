# 网络请求

网络请求统一用 fetch

### 网络环境配置

日常开发是需要配置多套环境，然后通过打包配置，或者环境切换开关进行环境切换。
为保证安全配置，网络配置分为线上打包配置 跟 本地开发配置。
本地开发配置：
修改根目录 configs/environments.js
如果该文件不存在，先创建

```
//根目录 configs/environments.js
export const environments = [
  {
    id: 'development',
    name: '开发环境',
  },
  {
    id: 'test',
    name: '测试环境',
  },
  {
    id: 'staging',
    name: '预发环境',
  },
  {
    id: 'production',
    name: '生产环境',
    default: true,
  },
];

export const envConfigsMap = {
  development: {
    domain: 'terminus.io',
    url: 'https://portal-web-dev.app.terminus.io',
  },
  test: {
    domain: 'terminus.io',
    url: 'https://portal-web-test.app.terminus.io',
  },
  staging: {
    domain: 'terminus.io',
    url: 'https://portal-web-test.app.terminus.io',
  },
  production: {
    url: 'https://portal-web-test.app.terminus.io',
    domain: 'terminus.io',
  },
};

```

线上打包配置:
修改 src/configs/environments.js
具体配置内容同上

### 网络请求配置

网络配置需要在 APP 启动之前配置或者环境变化后重新配置

1. react-native

移动端可以通过 debug 开关进行环境切换操作，因此需要监听环境变化。当网络环境发生变化后需要重新初始化 fetch
修改 src/index.jsx 文件

```js
import { EnvRegister } from '@terminus/rn-presets';
import { request } from '@terminus/mall-utils';
EnvRegister(environments, (config) => {
  const env = config.id;
  const envConfig = envConfigsMap[env];
  global.env = env;
  // 配置环境相关的 fetch 等
  request.initRequestConfig({
    // 初始化网络请求配置
    // 请求发出之前
    beforeSend: async (api, options) => {
      return {
        url: `${envConfig.url}${api}`,
        options,
      };
    },
    // 数据返回后
    onReceive: async (data, response) => {
      //可以在此进行401 登录拦截
      const { status } = response;
      if (status < 200 || status >= 300) {
        throw new Error(request.getMessage(data, '请求响应异常'));
      }
      if (data && !data.success) {
        throw new Error(request.getMessage(data, '响应异常'));
      }
    },
  });
});
```

2. web

web 端环境是根据打包进行配置的，无需监听环境变化
修改 src/index.web.jsx

```
request.initRequestConfig({
    // on
    onReceive: async (data, response) => {
      const { status } = response;
      if (status < 200 || status >= 300) {
        throw new Error(request.getMessage(data, '请求响应异常'));
      }
      if (data && !data.success) {
        throw new Error(request.getMessage(data, '响应异常'));
      }
    },
  });
```

### 网络请求

demo 如下

```
import { request } from '@terminus/mall-utils';
import { sha1 } from '@terminus/mall-utils';

export async function login(identify, password, captchaData = {}) {
  return request('/api/user/web/login/buyer/identify', {
    method: 'POST',
    data: { password: sha1(password), identify, ...captchaData },
    quiet: true,
  });
}
```
