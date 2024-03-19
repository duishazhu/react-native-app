import React from 'react';
import Image from 'common/image';
import { cdnPath } from '@terminus/mall-utils';
import { getLayoutStyle } from 'common/helper';

import empty from 'images/common/not-found.png';

function ProductImage(props) {
  const { src, style, ...otherProps } = props;
  const { width, height } = getLayoutStyle(props, 96, 96);

  return (
    <Image
      style={[{ width, height }, style]}
      source={{ uri: cdnPath({ src, width, height }), width, height }}
      defaultSource={empty}
      resizeMode="contain"
      lazyLoad
      {...otherProps}
    />
  );
}

export default ProductImage;
