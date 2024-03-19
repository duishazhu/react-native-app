# 通用业务组件

通用组件放在 components/common 文件夹下
开发过程中应尽量使用已封装好的通用组件，避免重复开发

**图片组件**

封装了默认图片和懒加载逻辑

```
import Image from 'common/image';

<Image source={imageUrl} lazyLoad />

```

**商品图片组件**

默认使用懒加载和 cdnPath 进行图片剪裁

```
import ProductImage from 'common/product-image';

<ProductImage src={imageUrl} width={96} height={96} />

```

**头像图片组件**

默认使用 cdnPath 进行图片剪裁

```
import Avatar from 'common/avatar';

<Avatar shape="circle" src={imageUrl} width={72} height={72} />

```

**图标组件**

默认 icon 组件，支持通过 style、size、width|height 设置 icon 的宽高
支持统一修改项目 icon 的前缀名

```
import { Icon } from 'common/icon';

<Icon type="left" size="28" color="#000" />
```

**轮播组件**

native 端重写修复一些已知问题，暂时不支持纵向轮播，其他端还是用 nusi-mobile 的轮播组件
web 端增加默认样式处理

```
import Carousel from 'common/carousel';

<Carousel
  autoplay
  style={styles.wrapper}
  autoplayInterval={autoplayInterval}
  selectedIndex={0}
  infinite
  dotStyle={styles.dot}
  dotActiveStyle={styles.dotActiveStyle}
  dots
>
  {children}
<Carousel/>
```

**弹框组件**

封装了安全距离处理逻辑(needSafeBottom/needSafeTop)以及通用的头尾样式

```js
import Modal from 'common/modal';

<Modal
  visible={visible}
  onClose={handleClose}
  title={<FormattedMessage id="trade.cart.coupon" defaultMessage="优惠券" />}
  bodyStyle={styles.cartCouponModalBody}
>
  {children}
</Modal>;
```
