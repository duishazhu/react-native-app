## 多业态项目使用文档

### 项目结构

```
├── android                         // 所有业务复用native端
├── ios                             // 所有业务复用native端
├── dice.yml
├── index.b2b.js                    // b2b web&rn端入口
├── index.b2c.js                    // b2c web&rn端入口
├── mall-b2b                        // b2b 源码文件夹
│   ├── client                        //b2b 客户端代码
│   ├── nginx.conf.template           //b2b nginx配置
│   └── server                        //b2b 服务端代码
├── mall-b2c
│   ├── client
│   └── server
├── mall-common                     // 复用文件夹，保持和业务文件夹里的client结构一致
│   ├── design
│   ├── plugin
│   ├── polyfill
│   └── utils
├── metro.config.js
├── octopus.config.js
├── pipeline.yml
├── react-native.config.js
├── scripts
└── webpack
```

### 本地调试

各个命令：

- 启动 herd
  herd 配置文件参考 example-pampasfile.js，然后 herd+配置文件启动即可
- 启动 web —— npm run dev b2c
- 启动装修 —— npm run watch:design b2c
- 启动小程序 —— npm run watch:wechat b2c test(test 指 pack_env 的值)
- 启动 rn —— npm run start b2c

#### 品牌站启动

- 启动 web —— npm run dev:brd b2c
- 启动装修 —— npm run watch:design:brd b2c
- 启动小程序 —— npm run watch:wechat:brd b2c test(test 指 pack_env 的值)
- 启动 rn —— npm run start:brd b2c

### 新增一个业态(在同一个项目中部署)

改动如下：

- 从 mall-b2c 拷贝文件夹，改成对应的文件夹，比如 mall-b2b
  - 在 mall-b2b 中搜索 mall-b2c, 将所有 mall-b2c 替换成 mall-b2b
  - 将 nginx.conf.template 中的 HERDB2C_HOST、HERDB2C_PORT 改为 HERDB2B_HOST、HERDB2B_PORT
- 从 index.b2c.js 拷贝改为 index.b2b.js, 并且将里面的内容 mall-b2c 改为 mall-b2b
- pipeline.yml
  - 第二个 stage, 复制 b2c-build，将里面所有的 b2c 字样换成 b2b
  - 第三个 stage, 复制 gaia-b2c、herdb2c，将里面所有的 b2c 字样换成 b2b
- dice.yml
  - 复制 herdb2c、gaia-b2c 中的所有 b2c 字样换成 b2b

### 问题

1. tms.json 生成暂时不支持，后续需要了支持
2. app 端调试一次只支持一个，无法多个同时调试
