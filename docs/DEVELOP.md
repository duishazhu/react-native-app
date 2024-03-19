# 二次开发

由于业务需求，多端统一也有二次开发的能力

## 静态资源

#### react-native

利用 babel-plugin-module-resolver 处理依赖路径的 api

```
#根目录下.babelrc 文件
[
        "module-resolver",
        {
          "root": ["./src/components", "./", "./src","./node_modules/@terminus/rn-b2b2c/"]
        }
]
```

root 的先后顺序不同，可以让 src/images, src/pages 等类似路径先找二次开发项目同路径内容，再去找 node_modules 下 rn-b2b2c 等包的内容，做到资源文件的二次开发无缝替换

_注意_
`坑1：react-native下有一个文件夹是settings，所以项目如果有一个根目录是settings，就会和react-native冲突，所以避免有名字settings的结构`

#### web

利用 webpack 的 resolver 下的 alias，modules 顺序可完成类似上边 babel 插件对 RN 的支持

_注意_
`注意modules尽量减少，能用alias的还是不用modules要不然webpack watch会很慢`

#### 小程序

#### 各端定向处理说明

- 专门针对 H5 环境的 JS 文件可以用 web.jsx 后缀结尾；
- 专门针对小程序环境的 JS 文件可以用 mp.jsx 后缀结尾；
- 如果需要进一步对各种小程序特殊处理可以用 [wx|alipay|dingding].mp.jsx 后缀，分别针对微信、支付宝、钉钉；
- 如果只需要对原生端定制可以用 native.jsx 后缀针对 RN 端的，然后用.jsx 针对其他端的；
