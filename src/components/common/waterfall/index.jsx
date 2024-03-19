import React from 'react';
import { ScrollView } from 'react-native';
import List from 'common/waterfall/list';

import styles from 'common/waterfall/style';

// TODO:  扩展展示多列，目前默认展示两列；目前数组对半分，后续需计算高度实现动态分配
function Waterfall(props) {
  const { wrapStyle, onEndReached, ...restProps } = props;

  return (
    <ScrollView
      onScroll={(e) => {
        const {
          contentOffset: { y: offsetY }, // 滑动距离
          contentSize: { height: contentSizeHeight }, // scrollView contentSize高度
          layoutMeasurement: { height: scrollHeight }, // scrollView高度
        } = e.nativeEvent;

        if (offsetY + scrollHeight >= contentSizeHeight * 0.8) {
          onEndReached?.();
        }
      }}
      contentContainerStyle={[styles.contentContainer, wrapStyle]}
    >
      <List {...restProps} />
    </ScrollView>
  );
}

export default Waterfall;
