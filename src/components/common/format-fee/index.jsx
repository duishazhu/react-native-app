import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Text } from 'react-native';
import _repeat from 'lodash/repeat';
import { round } from 'common/helper';
import styles from 'common/format-fee/style';
import { isNullOrUndefined } from '@terminus/mall-utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useIntl } from 'utils/react-intl';

function FormatFee(props) {
  const {
    style,
    fee,
    size,
    sign,
    sideSize,
    precision,
    separator,
    showSign,
    showUnit,
    unit,
    padFloat,
    color = EStyleSheet.value('$priceColor'),
    unitColor = '#999999',
    noUnitLeftMargin = 4,
    fontWeight = 'bold',
  } = props;

  const { getCurrency } = useIntl();

  if (isNullOrUndefined(fee)) return null;
  // 如果传进来的 fee 是被格式化过的字符串需要特殊处理
  const amount = round(+`${fee}`.replace(',', ''), precision);

  const currency = getCurrency();

  const parts = `${amount}`.split(separator);
  // eslint-disable-next-line
  const float =
    parts.length > 1 // eslint-disable-line
      ? padFloat
        ? `${parts[1]}${_repeat('0', precision - parts[1].length)}`
        : parts[1]
      : padFloat
      ? _repeat('0', precision)
      : null;
  return (
    <Text style={[styles.wrapper, style]}>
      {showSign && <Text style={[styles.text, { color, fontSize: sideSize, fontWeight }]}>{sign || currency}</Text>}
      <Text style={[styles.text, { color, fontSize: size, fontWeight }]}>{parts[0]}</Text>
      {float ? <Text style={[styles.text, { color, fontSize: sideSize, fontWeight }]}>.{float}</Text> : null}
      {showUnit && (
        <Text style={{ color: unitColor, fontSize: sideSize, marginLeft: noUnitLeftMargin }}>/{unit || '件'}</Text>
      )}
    </Text>
  );
}

FormatFee.defaultProps = {
  fee: null,
  size: 17,
  sideSize: 12,
  precision: 2,
  separator: '.',
  showSign: true,
  padFloat: true,
};

FormatFee.propTypes = {
  size: PropTypes.number,
  sign: PropTypes.string,
  color: PropTypes.string,
  showSign: PropTypes.bool,
  padFloat: PropTypes.bool,
  sideSize: PropTypes.number,
  precision: PropTypes.number,
  separator: PropTypes.string,
  fee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showUnit: PropTypes.bool,
  unit: PropTypes.string,
  unitColor: PropTypes.string,
};

export default memo(FormatFee);
