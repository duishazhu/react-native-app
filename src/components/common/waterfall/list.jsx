import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import styles from 'common/waterfall/style';
import _map from 'lodash/map';
import _uniqBy from 'lodash/uniqBy';
import _reduce from 'lodash/reduce';

// 按照index顺序左右对半分
function halfArray(list, originalData) {
  const len = list.length;
  const [left = [], right = []] = originalData;
  for (let i = 0; i < len / 2; i++) {
    left.push(list[i * 2]);
    right.push(list[i * 2 + 1]);
  }
  len % 2 && right.pop();
  return [left, right];
}

function Waterfall(props) {
  const { data, renderItem } = props;

  const [articleList, setArticleList] = useState([]);

  const sourceData = useMemo(() => _uniqBy(data, 'id'), [data]);

  const dataHeightMap = React.useRef({
    count: 0,
    list: [],
  });

  useEffect(() => {
    if (sourceData?.length) {
      const startIndex = (dataHeightMap.current.list[0]?.length || 0) + (dataHeightMap.current.list[1]?.length || 0);
      let newList = [];

      if (startIndex >= sourceData.length) {
        newList = halfArray(sourceData, []);
        dataHeightMap.current = { list: newList, count: 0 };
      } else {
        newList = halfArray(sourceData.slice(startIndex), dataHeightMap.current.list);
        dataHeightMap.current.list = newList;
      }
      setArticleList(newList);
    }
  }, [sourceData]);

  const onItemLayout = ({ height }, item, columnIndex, itemIndex) => {
    let isReload = false;
    if (!dataHeightMap.current[item.id]) {
      dataHeightMap.current.count++;
    } else {
      isReload = true;
    }

    dataHeightMap.current[item.id] = height;
    dataHeightMap.current.list[columnIndex][itemIndex].height = height;

    if (isReload) return;

    if (dataHeightMap.current.count === dataHeightMap.current.list[0].length + dataHeightMap.current.list[1].length) {
      format();
    }
  };

  const format = () => {
    let {
      list: [leftList, rightList],
    } = dataHeightMap.current;

    let lastLeftHeight = leftList.slice(-1)[0].height;
    let lastRightHeight = rightList.slice(-1)[0].height;

    let leftH = _reduce(leftList, (t, { height }) => t + height, 0);
    let rightH = _reduce(rightList, (t, { height }) => t + height, 0);

    // 左边比右边大
    if (leftH > rightH) {
      let curDiff = leftH - rightH;
      let diff = curDiff - 2 * lastLeftHeight;
      while (Math.abs(diff) < Math.abs(curDiff)) {
        leftH -= lastLeftHeight;
        rightH += lastLeftHeight;

        const popItem = leftList.pop();
        lastLeftHeight = leftList.slice(-1)[0].height;
        rightList.push(popItem);

        curDiff = diff;
        diff = curDiff - 2 * lastLeftHeight;
      }
    } else {
      let curDiff = rightH - leftH;
      let diff = curDiff - 2 * lastRightHeight;
      while (Math.abs(diff) < Math.abs(curDiff)) {
        leftH += lastRightHeight;
        rightH -= lastRightHeight;

        const popItem = rightList.pop();
        lastRightHeight = rightList.slice(-1)[0].height;
        leftList.push(popItem);

        curDiff = diff;
        diff = curDiff - 2 * lastRightHeight;
      }
    }
    dataHeightMap.current.list = [leftList, rightList];
    setArticleList([leftList, rightList]);
  };

  return _map(articleList, (col, index) => (
    <View style={styles.column} key={index}>
      {_map(col, (item, itemIndex) => (
        <View key={item.id} onLayout={(e) => onItemLayout(e.nativeEvent.layout, item, index, itemIndex)}>
          {renderItem({ item })}
        </View>
      ))}
    </View>
  ));
}

export default Waterfall;
