### 标品迭代基本规范

1. `FormattedMessage` 可以加 `style` 属性改样式，不用在外面再包裹一层`Text`，凡是`Text`里面只有一个 `FormattedMessage`元素的都要改过来；
2. 颜色值尽量引用`default-themes.js`里面的值，尤其是`$primaryColor`/`$colorTextBase`/`$colorBackground`这几个颜色对应的色值统一改用引用方式；
3. 圆角统一引用`default-themes.js`里面的值，`8px`的圆角统一引用`$radius_common`其他不够的可以在主题里面再定义并引用；
4. Icon 使用的时候统一去掉`icon-`前缀，默认会加上的，尤其检查`ic-tmall-`前缀的图标，照理说不该有这种情况了；
5. 获取参数统一采用`@terminus/octopus-hooks` 里的`useQuery` hook, 这个 hook 可以把 path 和 search 中的参数都能取到；
6. 整数位和小数位大小不一的金额格式化统一采用`FormatFee`组件；
7. 页面`BasePage` 组件的 `title` 属性国际化统一采用 `formatMessage` 方法而不是 `FormattedMessage` 元素，这样生成的 DOM 结构也更简单一些；
8. i18n key 的命名方式统一采用 `模块.页面/组件.驼峰式描述`的形式，格式不对的或者拼写有错的都在代码里面和文案管理平台上改过来，然后通过 `npm run locale:get`更新 locale 文件;
9. 避免文案不当分割，例如”总共 8 件商品“，不要分成”总共”和”件商品“两端文案，而应该用带参数的国际化文案替代；
10. VS Code 都装下 _Code Spell Checker_ 插件，代码里面如果有拼写错误会提示的，检查下把代码里面的各种命名拼写错误都改过来吧；
11. 确保自己负责模块的代码用 `npm run lint`扫描后没有错误或警告, 不要为了消除警告而在整个文件范围内禁用所有检查；

#### 其它开发注意事项

- 尽量采用`React hooks`进行开发；
- 特殊情况不能采用`Hooks`时，可以采用`PureComponent/Component`组件，但是请勿使用将要被淘汰的生命周期函数；
- 通用工具等可以用`ts`开发，带来更友好的提示, 但是业务代码统一使用 `js` 开发方便客户接手维护；
- 文件名、目录名统一小写用`-`连接, 其中如有名词请采用单数形式；
- `js`/`jsx`/`scss`文件的引入统一采用绝对路径，而不是相对路径，比如: `import { OrderManage } from 'order/manage';`;
- `Lodash`方法导入建议使用 `import _filter from 'lodash/filter';` 的方式，而不是全部导入;
- 统一约定下：`XX详情页`的`id`不要放在`query`里面，统一放到`path`里面，比如`/seller/order-detail?id=400658011`统一改成`/seller/order/detail/400658011`, 订单详情、售后详情、发货单详情、评价详情等页面都照这个约定来吧，另外列表页`url`统一用复数比如 `/buyer/orders`, 但是源码目录命名不要复数;
- 对于 Label 后带冒号的文案展示，比如`下单时间: 2019/06/21 14:08:21`之类的，为了翻译方便`:`不放在翻译文案里面，只需要翻译`下单时间`即可，同时通过在`FormattedMessage` 上加`hasColon` 属性以显示`:`，或者引用`common/colon`组件;
- 每个 Url 链接都有一个`pages`目录与之对应，但是对于`components`里的目录不一定要与`pages`里的目录一一对应，`components`里可以按业务模块进行划分: 比如售后列表、售后详情、售后申请页面都属于`售后`都放在`components/after-sales`里面，该目录下的`services.js`主要存放后台请求相关接口定义，同时列表、详情、售后页面分别对应一个`manage`/`detail`/`apply`文件，这三个文件又均通过`index.jsx`导出，所有的业务相关零星小组件都放在`components/after-sales/children`下面；
- 项目范围内的通用的组件可以放在 `components/common/` 目录下，方便其他开发引用;
- 如果需要在非装修页面里面调用装修组件, 请在 `src/pages` 下面调用`DesignPart`, 并将父 `props` 传入例如: `<DesignPart partKey="header" {...props} />`, 因为装修组件可能会使用 `props` 中的 `{ match, location, history }`;
- 获取参数统一采用`@terminus/octopus-hooks` 里的`useQuery` hook, 这个 hook 可以把 path 和 search 中的参数都能取到；`NavigationService.getParams`在 app、web、小程序有一个问题，a -> b -> c 页面栈中都用了 commonData, 刷新了 commonData 会造成所有页面的 render, getParams 就会存在取不到参数或者取错了的情况;

#### 多语言国际化相关

- 多语言 locale 的`key`命名规则: `模块名.页面名.[section].自定义文案名`, 比如 order.detail.pageTitle 等，后面的自定义名统一采用驼峰式;
- 国际化命名 key 的时候可以在 key 上加个[section]部分，因为最后的 key 会被排序，加个[section]，同一`section`的部分最终会排在一起，找起来也方便，比如:
  `trade.orderManage.tabBar.allOrders` / `trade.orderManage.filter.orderStatus`中 `tabBar`, `filter` 就是`section`名;
- 模块名约定如下: 用户: `user`, 商品、类目: `item`, 购物车、下单、支付、订单、售后: `trade`，比较通用的文案可以归到 `common` 模块;
- 国际化文案声明可从`utils/react-intl`中引入`FormattedMessage, formatMessage, defineMessages, defineMessage`，然后统一通过这几种方式声明，方便后续扫描并自动创建；
