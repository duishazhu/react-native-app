export interface FormatPrice {
  price?: any;
  percent?: number;
  decimal?: number;
  isSimple?: boolean;
  needComma?: boolean;
  isPrefix?: boolean;
}

/**
 * 格式化价格
 * @param  price 默认单位元
 * @param  percent 整除倍数
 * @param  decimal 保留的小数位数
 * @param  isSimple 是否是简洁模式：即会舍掉小数点后面的0
 * @param  needComma 是否需要逗号
 */

export default function formatPrice(props: FormatPrice): any {
  const { price, percent = 1, decimal = 2, isSimple = false, needComma = true } = props;
  if (!/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(price)) return price; // 匹配所有数字，如不满足则直接返回
  // if (price === null) return price;
  if (percent === 0) return percent;

  const divisionUnit = 10 ** decimal;
  const roundPrice = Math.round((price / percent) * divisionUnit) / divisionUnit;
  const realPrice = roundPrice.toFixed(decimal);
  const priceInt = realPrice.split('.')[0];
  const priceDecimal = realPrice.split('.')[1] || '';
  const priceIntStrs = priceInt.split('').reverse();

  let formatPriceDecimal = priceDecimal;
  if (isSimple) {
    const reverseDecimalStrs = priceDecimal.split('').reverse();
    let maxIndex = reverseDecimalStrs.length - 1;
    let nonZeroIndex = reverseDecimalStrs.findIndex((it) => it !== '0');
    let lastNonZeroIndex = nonZeroIndex === -1 ? nonZeroIndex : maxIndex - nonZeroIndex;
    formatPriceDecimal = priceDecimal.substring(0, lastNonZeroIndex + 1);
  }

  let priceStr = '';
  priceIntStrs.forEach((item, index) => {
    const isThousand = (index + 1) % 3 === 0;
    const isLast = index + 1 === priceIntStrs.length;
    const commaStr = isThousand && !isLast ? ',' : '';
    priceStr += `${item}${commaStr}`;
  });
  const formattedPriceStr = needComma ? priceStr.split('').reverse().join('') : priceIntStrs.reverse().join('');
  return formatPriceDecimal ? `${formattedPriceStr}.${formatPriceDecimal}` : formattedPriceStr;
}
