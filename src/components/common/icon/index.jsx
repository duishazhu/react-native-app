import React, { useMemo, memo } from 'react';
import { svgIcon } from 'fonts/iconfont-svg';
import { getStyle, getLayoutStyle } from 'common/helper';
import { Icon as NusiIcon } from '@terminus/nusi-mobile';

NusiIcon.load('svg', svgIcon);

const ICON_SIZE = {
  xxs: 15,
  xs: 18,
  sm: 21,
  md: 22,
  big: 28,
  lg: 36,
};
const preName = 'icon-';

function IconSvg(props) {
  const { type, width, height, size, style = {}, color } = props;
  const iconStyle = useMemo(() => getStyle(style), [style]) || {};
  const { color: styleColor, ...restStyle } = iconStyle;
  const { width: iconWidth, height: iconHeight } = getLayoutStyle({
    width,
    height,
    size: ICON_SIZE[size] || size,
    style: iconStyle,
  });

  const iconType = new RegExp(preName).test(type) ? type : `${preName}${type}`;

  return (
    <NusiIcon
      width={iconWidth || 22}
      height={iconHeight || 22}
      color={color || styleColor}
      type={iconType}
      style={restStyle}
      svg
    />
  );
}

export const Icon = memo(IconSvg);
