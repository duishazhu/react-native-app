/* eslint-disable react/no-unused-prop-types */
import { Text, TextProps, Platform } from 'react-native';
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';
import { MessageDescriptor } from '@formatjs/intl';
import { parse } from 'intl-messageformat-parser';
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  createContext,
  useContext,
  PropsWithChildren,
  useEffect,
  useCallback,
} from 'react';
import formatPrice, { FormatPrice } from 'utils/format-price';

const IntlContext = createContext({});

type FormattedMessageProp = PropsWithChildren<
  MessageDescriptor &
    TextProps & {
      values: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>;
      hasColon: boolean;
    }
>;

const currencySymbol = {
  USD: '$',
  CNY: '￥',
};

const TAB_BAR_MESSAGE_ID = [
  'member.basic.homePage',
  'member.basic.classification',
  'member.basic.contentPage',
  'member.basic.shopCart',
  'member.basic.my',
  'member.basic.orders',
];

const IntlProvider = ({ theme, defaultLocale, children, messages, locale }) => {
  const formatMessage = useCallback(
    ({ id, defaultMessage }, values = {}) => {
      const msg = parse(messages[id] ?? defaultMessage).map(({ type, value }: any) => {
        if (type === 1) {
          return values[value];
        }
        return value;
      });

      const isString = msg.every((item) => typeof item === 'string' || typeof item === 'number');
      if (isString) {
        return msg.join('');
      }

      return React.Children.toArray(msg);
    },
    [messages]
  );

  function formatPriceNumber(props: FormatPrice) {
    const { isPrefix = true } = props;
    const formatResult = formatPrice(props);

    const currency = currencySymbol[locale || defaultLocale] || currencySymbol.CNY;
    return `${isPrefix ? currency : ''}${formatResult}`;
  }

  function getCurrency() {
    return currencySymbol[locale || defaultLocale] || currencySymbol.CNY;
  }

  useEffect(() => {
    TAB_BAR_MESSAGE_ID.forEach((id, index) => {
      if (messages[id]) {
        Platform.API.setTabBarItem({
          index,
          text: formatMessage({ id, defaultMessage: messages[id] }),
        });
      }
    });
  }, [messages, formatMessage]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <IntlContext.Provider value={{ theme, defaultLocale, locale, formatMessage, formatPriceNumber, getCurrency }}>
      {children}
    </IntlContext.Provider>
  );
};

const useIntl = (): any => {
  return useContext(IntlContext);
};

const FormattedMessage = memo(
  forwardRef<any, FormattedMessageProp>(
    ({ id, values, defaultMessage, description, hasColon, children, ...props }, ref) => {
      const { formatMessage } = useIntl();
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

const injectIntl = (Component) => {
  return function (props) {
    const intl = useIntl();

    return <Component {...props} intl={intl} />;
  };
};

const defineMessages = (messages: Record<string, any>) => {
  return messages;
};

const defineMessage = (message: Record<string, any>) => {
  return message;
};

export { IntlProvider, useIntl, FormattedMessage, injectIntl, defineMessages, defineMessage };
