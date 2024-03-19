/**
 * 沉浸式状态栏
 * 区分顶部和底部背景色
 */
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from 'common/safe-area-view/style';

const defaultForceInset = {
  top: 'never',
  bottom: 'always',
};

const SafeAreaView = ({
  forceInset = defaultForceInset,
  style,
  noBottom = true,
  children,
  bottomColor = '',
  ...otherProps
}) => {
  const newForceInset = { ...defaultForceInset, ...forceInset };
  const { top, bottom } = useSafeAreaInsets();
  const paddingTop = newForceInset.top === 'never' ? 0 : top;
  const paddingBottom = newForceInset.bottom === 'never' ? 0 : bottom;
  return (
    <View style={[styles.container, style, { paddingBottom, paddingTop }]} {...otherProps}>
      {!noBottom ? <View style={[styles.fixStatusBar, bottomColor ? { backgroundColor: bottomColor } : {}]} /> : null}

      {children || null}
    </View>
  );
};

export default SafeAreaView;
