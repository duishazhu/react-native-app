import React, { memo } from 'react';
import { Image } from '@terminus/nusi-mobile';
import { ImageProps } from '@terminus/nusi-mobile/lib/image/interface';

import empty from 'images/common/not-found.png';

function CommonImage(props: ImageProps) {
  return <Image defaultSource={empty} resizeMode="contain" {...props} />;
}

export default memo(CommonImage);
