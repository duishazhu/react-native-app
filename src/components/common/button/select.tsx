import React, { PropsWithChildren } from 'react';
import { View, Text, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import { Icon } from 'common/icon';
import { selectStyles as styles } from 'common/button/style';

interface IProps {
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  textProps?: any;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function SelectButton({
  style,
  textStyle,
  children,
  disabled,
  onPress,
  textProps = {},
}: PropsWithChildren<IProps>) {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={[styles.text, textStyle]} {...textProps}>
          {children}
        </Text>
        <Icon type="icon-arrow-down-black" size={13} style={{ width: 16 }} />
      </View>
    </TouchableWithoutFeedback>
  );
}
