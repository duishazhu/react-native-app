import React from 'react';
import { ImageBackground } from 'react-native';

// 兼容处理一些接口返回的图片url不带协议头
export default ({ source, ...props }) => {
  let newSource = source;

  if (typeof source === 'object') {
    const uri = source.uri || '';
    if (uri && uri.indexOf('//') === 0) {
      const url = `https:${uri}`;
      newSource = { ...source, uri: url };
    }
  }

  return <ImageBackground {...props} source={newSource} />;
};
