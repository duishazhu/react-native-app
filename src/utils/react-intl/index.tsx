import { useIntl as useOriginIntl } from 'react-intl';
import { Text, TextProps } from 'react-native';
import { MessageDescriptor } from '@formatjs/intl';
import formatPrice, { FormatPrice } from 'utils/format-price';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';

interface FormattedMessageProp<V extends Record<string, any> = Record<string, React.ReactNode>>
  extends MessageDescriptor,
    TextProps {
  values: V;
  hasColon: V;
}

export * from 'react-intl';

export const FormattedMessage = memo(
  forwardRef<any, FormattedMessageProp>(
    ({ id, values, defaultMessage, description, hasColon, children, ...props }, ref) => {
      const { formatMessage } = useOriginIntl();
      const textRef = useRef();

      useImperativeHandle(ref, () => textRef.current);

      const text = formatMessage({ id, defaultMessage, description }, values);

      return typeof children !== 'function' ? (
        <Text {...props} ref={textRef}>
          {text}
          {hasColon ? ': ' : null}
        </Text>
      ) : (
        children(text)
      );
    }
  )
);

export const useIntl = () => {
  const { formatNumberToParts, formatNumber, formatMessage, ...originIntl } = useOriginIntl();

  function formatPriceNumber(props: FormatPrice) {
    const { price, isPrefix = true } = props;
    const formatResult = formatPrice(props);

    const [{ value: currency }] = formatNumberToParts(price, { format: 'formatPrice' });
    return `${isPrefix ? currency : ''}${formatResult}`;
  }

  function getCurrency() {
    const [{ value: currency }] = formatNumberToParts(0, { format: 'formatPrice' });
    return currency;
  }

  return {
    ...originIntl,
    formatNumber,
    getCurrency,
    formatPriceNumber,
    formatNumberToParts,
    formatMessage,
  };
};
