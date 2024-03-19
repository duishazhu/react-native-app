// 渐变色 wrapper
// 属性参照 react-native-linear-gradient 文档，https://github.com/react-native-community/react-native-linear-gradient
// TODO: 后续可抽离更多参数供开发配置  目前仅于我的使用
import React, { memo } from 'react';
import LinearGradient from 'react-native-linear-gradient';

function Wrapper(props) {
  const { children, style, start, end } = props;
  return (
    <LinearGradient end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }} style={style} colors={[start, end]}>
      {children}
    </LinearGradient>
  );
}

export default memo(Wrapper);
