// 渐变色 wrapper
// TODO: 后续可抽离更多参数供开发配置  目前仅于首页、购物车、我的使用
import { View } from 'react-native';
import React, { memo } from 'react';

function Wrapper(props) {
  const { style, children, start, end, angle = 135, startPercent = 0, endPercent = 100 } = props;
  const gradient = {
    backgroundImage: `linear-gradient(${angle}deg, ${start} ${startPercent}%, ${end} ${endPercent}%)`,
  };

  return <View style={[style, gradient]}>{children}</View>;
}

export default memo(Wrapper);
