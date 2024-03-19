# design-component-options 配置

开放一组 options 属性，供装修组件修改 @terminus/mall-base 中的 **react-native-design-page 装修页面组件**

### 配置方法

以 design/category 分类组件为例，现需要添加 options 文件，在组件文件夹下添加 `options.jsx` 文件，定义一组如下对象：

```js
export default {
  setDesignContainerProps: () {...},
  setDesignCompProps: () {...},
  renderErrorComp() {...},
}
```

再在 `design/design-component-options-map.js` 文件中引入此文件：

```
import design_category from './components/category/options'

export default {
  'design/category': design_category,
}
```

> export 的 key 值 'design/category'，需要与 `design-component-map.js` 和 `design-component-config-map.js` 中的 key 值保持一致

### 目前支持配置项

目前支持三个配置项，后如需增添新的配置项，需要在 mall-base 中 react-native-design-page 同步相关逻辑

- setDesignContainerProps: (compProps) => {}
- 允许装修组件更改父级 list 容器的 props
- setDesignCompProps: (compProps) => {}
- 每个装修组件外部还有一个 View，此配置项支持修改此 View 的 props
- renderErrorComp: () => {}
- 可自定义该装修组件的抛错展示
