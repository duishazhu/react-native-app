# 工程结构

```
├── CHANGELOG.md
├── Pampasfile-default.js
├── README.md
├── android                               // android 工程文件
├── configs                               // 环境配置
│   └──
├── doc                                   // 开发文档
├── index.js                              // 移动端(android & ios) 入口文件
├── ios                                   // iOS工程文件
├── metro.config.js                       // 移动端打包配置(可进行bundle拆分配置、扩展支持的文件类型: scss,tsx等)
├── octopus.config.js                     // 微信小程序打包配置
├── package-lock.json
├── package.json
├── server                                // 装修server配置
│   ├── config
│   │   ├── index.js
│   │   └── service.js
│   ├── helper.js
│   ├── index.js
│   ├── middleware
│   └── router
├── src                                  // 前端工程文件
│   ├── components                       // 公共组建
│   ├── configs                          // 路由及环境配置
│   │   ├── README.md
│   │   ├── app.jsx                      // APP预加载
│   │   ├── environments.js              // 环境配置
│   │   ├── navigators.js                // 页面路由配置(引导页、首页tab、业务)
│   │   └── tumbler.jsx
│   ├── design
│   │   └── design.json
│   ├── images                          // 图片资源
│   │   └── white-logo.png
│   ├── index.jsx                       // 移动端入口
│   ├── index.web.jsx                   // h5入口
│   ├── mp_app.tsx                      // 小程序入口 及 路由配置
│   ├── pages                           // APP页面
│   ├── styles                          // 全局样式
│   │   ├── index.js
│   │   └── theme.js
│   ├── utils                           // 工具方法
│   └── views
│       └── index.ejs
├── svgmake.js                         // iconfont 生成工具
├── tsconfig.json
└── webpack.config.js

```

## 移动端工程结构

- Android[工程结构](https://yuque.antfin-inc.com/docs/share/284ce4f0-4146-4ef4-a6c7-72615460d3c8?#)
- ios[工程结构](https://yuque.antfin-inc.com/docs/share/284ce4f0-4146-4ef4-a6c7-72615460d3c8?#)
