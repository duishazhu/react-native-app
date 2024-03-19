import React, { useRef } from 'react';
import { FlatList as PureFlatList } from 'react-native';

// 避免 flatList 重复调用 onEndReached 函数  相关issue：https://github.com/facebook/react-native/issues/14015#issuecomment-310675650

function CommonFlatList(props, ref) {
  const readyLoadMore = useRef(false);
  const { onEndReached, ...restProps } = props;
  const _onEndReached = () => {
    if (readyLoadMore.current) {
      onEndReached && onEndReached();
      readyLoadMore.current = false;
    }
  };

  return (
    <PureFlatList
      ref={ref}
      {...restProps}
      onEndReached={_onEndReached}
      onMomentumScrollBegin={() => {
        readyLoadMore.current = true;
      }}
    />
  );
}

const FlatList = React.forwardRef(CommonFlatList);

FlatList.defaultProps = {
  onEndReachedThreshold: 0.5,
};

export default FlatList;
