/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { View } from 'react-native';
import ColumnList from 'common/waterfall/column-list';

export default (props) => {
  const { data = [], renderItem } = props;
  const dataHeightMap = useRef({});

  const handleItemLayout = (e, item) => {
    const { height } = e.nativeEvent.layout;
    dataHeightMap.current[`item-${item.totalIndex}`] = height + 7;
  };

  const renderListItem = ({ item }) => {
    if (item.isView === false) {
      return <View style={{ height: item.height }} />;
    }
    return renderItem({ item, getItemLayout: (e) => handleItemLayout(e, item) });
  };

  if (!data || !data.length) return null;

  const listLeft = [];
  const listRight = [];

  let leftTotalHeight = 0;
  let rightTotalHeight = 0;

  data.forEach((item, index) => {
    const itemHeight = dataHeightMap.current[`item-${index}`] || 240;

    item.totalIndex = index;

    if (leftTotalHeight <= rightTotalHeight) {
      item.columnIndex = listLeft.length;
      // 标记是左边商品
      item.index = 0;
      listLeft.push(item);
      leftTotalHeight += itemHeight;
      item.height = 150;
    } else {
      item.columnIndex = listRight.length;
      // 标记是右边商品
      item.index = 1;
      listRight.push(item);
      rightTotalHeight += itemHeight;
      item.height = 160;
    }
  });

  return (
    <>
      <ColumnList listKey="left" key="left" data={listLeft} renderItem={renderListItem} />
      <ColumnList listKey="right" key="right" data={listRight} renderItem={renderListItem} />
    </>
  );
};
