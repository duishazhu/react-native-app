import React, { isValidElement } from 'react';
import { View, Text } from 'react-native';
import { ButtonProps } from '@terminus/nusi-mobile/lib/button/interface';
import CardActions from 'common/card/actions';
import styles from 'common/card/style';

interface IProps {
  style?: any;
  title?: string | React.ReactElement | React.ReactNode;
  children?: React.ReactElement | React.ReactNode;
  footer?: React.ReactElement | React.ReactNode;
  actions?: ButtonProps[];
}

export default function Card({ style, title, children, footer, actions }: IProps) {
  return (
    <View style={[styles.container, style]}>
      {!!title && (
        <View style={styles.header}>{isValidElement(title) ? title : <Text style={styles.title}>{title}</Text>}</View>
      )}
      <View style={styles.body}>{children}</View>
      {(!!footer || !!actions?.length) && (
        <View style={styles.footer}>
          {footer}
          <CardActions style={styles.footerRight} actions={actions} />
        </View>
      )}
    </View>
  );
}
