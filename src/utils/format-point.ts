export interface IFormatPointProps {
  point?: any;
}

/**
 * 格式化积分
 * @param  point
 */

export default function formatPoint(props: IFormatPointProps) {
  const { point } = props;
  if (!/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(point)) return point; // 匹配所有数字，如不满足则直接返回
  if (point === 0) return null;
  return (point || 0).toString().replace(/(?!^)(\d{3})(?=(?:\d{3})*$)/g, ',$1');
}
