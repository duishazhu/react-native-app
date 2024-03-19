import { deviceWidth } from 'common/constants';

/**
 * 根据 deviceWidth / 375 缩放尺寸
 * @param size 需要缩放的尺寸
 */
export function scaleSize(size: number) {
  const defaultPixel = 2; // iPhone6 的像素密度

  // px 转换为 dp 获取iPhone6的一些数值
  const w2 = 750 / defaultPixel;
  const scale = deviceWidth / w2; // 获取缩放比例

  return Math.floor(size * scale);
}

/**
 * 适用一行多列排序的屏幕适配函数 使用场景例如主搜、推荐组组件
 * 传入一行列数、及间距合计值 获取每列宽度
 * @param options.cols 一行列数
 * @param options.spacing 列表左右及中间间距的合计值
 */
export function scaleColSize(cols: number, spacing: number) {
  return (deviceWidth - spacing) / cols;
}
