import React from 'react';
import { Button as OriginButton } from '@terminus/nusi-mobile';
import { ButtonProps } from '@terminus/nusi-mobile/lib/button/interface';

const fontSizeMap = {
  small: 12,
  medium: 13,
  large: 14,
};

export default function Button(props: ButtonProps) {
  return <OriginButton textStyle={{ fontSize: fontSizeMap[props.size] }} {...props} />;
}

Button.defaultProps = {
  size: 'medium',
  capsule: true,
};
