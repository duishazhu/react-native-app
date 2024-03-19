# Parana-mobile

多端统一项目模板，一套代码四端运行(Android、iOS、h5、小程序)

## 环境准备

多端统一环境主要是前端环境、Android、iOS
具体可以环境搭建参考[环境配置说明](docs/ENVIRONMENT.md)

## 启动

[多端统一项目启动](docs/START.md)

## 开发文档

- [项目结构](docs/PROJECT_TREE.md)
- [通用业务组件](docs/COMMON_BUSINESS_COMPONENTS.md)
- [二开指南](docs/DEVELOP.md)
- [路由](docs/NAVIGATION.md)
- [基础组件](docs/COMPONENTS.md)
- [网络请求](docs/NETWORK.md)

## 调试

- [移动端调试](docs/MODBILE_DEBUG.md)

## 性能优化

日常开发优化[注意事项](docs/PERFORMANCE.md)

## CHANGELOG

版本变化[记录](./CHANGELOG.md)

## 附录

- [iOS uidi 添加说明](docs/IOS_UDID.md)
- [APP 发版说明](docs/APP_UPDATE_PUBLISH.md)
- [小程序端开发编译说明](docs/mp/INTRODUCTION.md)

## 环境变量获取

使用 hooks 获取

```jsx
function DemoComponent() {
  const env = useEnv();
  console.log(env);
  return <Text>test env</Text>;
}
```

使用 wrapper 获取

```js
export const injectedEnvComponent = injectEnv(Component);
```

## 图片上传

使用 [mall-tools](https://npm.terminus.io/package/@terminus/mall-tools) 进行图片上传 cdn, 并生成 cdn-images

npm run upload-image

### 注意事项

- 由于未知原因导致 antd 的 Provider 必须放在其他的 Provider 里面。也就是在 tumbler.plugin() 最后调用
- 配置各个页面的 path 避免出现一个页面的 path 作为另一个页面 path 的前缀，比如/buyer,/buyer/center, 否则会导致 h5 跳转紊乱，应该改为/buyer/index, /buyer/center
