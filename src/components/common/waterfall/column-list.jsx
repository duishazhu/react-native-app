import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import _chunk from 'lodash/chunk';
import styles from 'common/waterfall/style';

export default (props) => {
  const { threshold = 5, renderItem, data, listKey } = props;
  const [headIndex, setHeadIndex] = useState(0);
  const [tailIndex, setTailIndex] = useState(10);

  const handleLeftViewChange = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstItem = viewableItems[0]?.item.columnIndex || 0;
      const tailItem = viewableItems[viewableItems.length - 1]?.item.columnIndex || 0;
      const head = Math.max(firstItem - threshold, 0);
      setHeadIndex(head);
      setTailIndex(Math.max(tailItem + threshold, 10, firstItem + 8));
    }
  });

  const viewConfig = useRef({
    minimumViewTime: 100,
    itemVisiblePercentThreshold: 10,
    waitForInteraction: false,
  });

  const heads = _chunk(data.slice(0, headIndex), threshold).map((range, i) => {
    const height =
      range.reduce((total, curr) => {
        return total + curr.height;
      }, 0) || 0;

    return {
      isView: false,
      id: `list-head-${i}`,
      columnIndex: range[0].columnIndex,
      height,
    };
  });

  const tails = _chunk(data.slice(tailIndex), threshold).map((range, i) => {
    const height =
      range.reduce((total, curr) => {
        return total + curr.height;
      }, 0) || 0;
    return {
      isView: false,
      id: `list-tail-${i}`,
      columnIndex: range[0].columnIndex,
      height,
    };
  });

  const items = [...heads, ...data.slice(headIndex, tailIndex), ...tails];

  return (
    <FlatList
      removeClippedSubviews={false}
      style={styles.column}
      listKey={listKey}
      key={listKey}
      data={items}
      keyExtractor={(item) => `${item.id}`}
      viewabilityConfig={viewConfig.current}
      onViewableItemsChanged={handleLeftViewChange.current}
      renderItem={renderItem}
    />
  );
};
