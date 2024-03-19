# 装修系统(客户端)

目前 b2c 项目中包含了 bbc、o2o 的代码，装修系统本身不会区分 bbc、o2o，但是业务本身是要支持同时存在 bbc、o2o 站点数据以及相应站点切换(分城运营)的功能，所以在渲染时要进行数据隔离以及相应的业态区分

## 开发

### mall-base 改造

1. 原来的`ReactNativeDesignPage`是在应用启动前拿到 host 请求 page-list 接口进行装修初始化，缺点：在移动端，需要确保应用更快出现页面，如果网络慢或者接口报错会导致应用无法正常启动。所以将装修初始化逻辑放到项目中，优点：减少启动前的请求，应用启动更快；可以根据具体业务决定何时初始化
2. b2c 项目中会同时有 bbc 和 o2o 两个首页，所以会存在两套装修数据，design-plugin 新增了 scope 用来存储不同业态的装修数据，做到数据隔离；但是同时也需要给 ReactNativeDesignPage scope 属性，用来渲染相应业态的装修页面

### 路由

融合场景下需要两个首页，所以新增了一个 o2o 专用的 Tab 路由栈

## 配置(编译时)

| 名称                         | 值                                         | 备注                                                       |
| ---------------------------- | ------------------------------------------ | ---------------------------------------------------------- |
| BUSINESS_TYPE                | BUSINESS_BBC\|BUSINESS_O2O\|BUSINESS_MIXED | 当前项目处于哪个业态(BBC、O2O、融合)                       |
| ENABLE_MULTI_DESIGN_SITE     | true\|false                                | 是否开启同城运营(优先级最高)                               |
| ENABLE_BBC_MULTI_DESIGN_SITE | true\|false                                | 是否开启 BBC 同城运营(优先级次于 ENABLE_MULTI_DESIGN_SITE) |
| ENABLE_O2O_MULTI_DESIGN_SITE | true\|false                                | 是否开启 O2O 同城运营(优先级次于 ENABLE_MULTI_DESIGN_SITE) |
