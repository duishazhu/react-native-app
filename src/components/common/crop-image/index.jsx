import React from 'react';
import { Image, View } from 'react-native';

/**
 * CropImage
 * 处理雪碧图
 * source: node|string
    crop: object,
    width: number,
    height: number,
    onPress: func,
 */
export function CropImage(props) {
  let { source, crop, width, height, onPress } = props;

  crop = crop || source.crop || {};

  crop.top = crop.top || 0;
  crop.left = crop.left || 0;
  crop.width = crop.width || width;
  crop.height = crop.height || height;
  return (
    <View
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: crop.height,
        width: crop.width,
        backgroundColor: 'transparent',
      }}
    >
      <Image
        onPress={onPress}
        style={{
          position: 'absolute',
          top: crop.top * -1,
          left: crop.left * -1,
          width,
          height,
        }}
        source={source}
        resizeMode="contain"
      />
    </View>
  );
}
