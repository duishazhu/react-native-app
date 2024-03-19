import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import BasePage from 'common/base-page';
import { IBasePage } from 'common/base-page/type';
import { orderDetailStyles as styles } from 'common/base-page/style';

export default function OrderDetailBasePage({ children, ...props }: PropsWithChildren<IBasePage>) {
  return (
    <BasePage headerStyle={styles.header} {...props}>
      <View style={styles.background} />
      {children}
    </BasePage>
  );
}
