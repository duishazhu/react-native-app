import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'common/icon';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import styles from './styles';

const IconText = ({
  color,
  fontSize = 12,
  preIcon,
  afterIcon,
  textStyle,
  iconSize,
  iconColor,
  iconStyle,
  children,
  onPress,
}) => {
  const content = (
    <>
      {preIcon && (
        <Icon
          type={preIcon}
          {...(iconColor && { color: iconColor })}
          size={iconSize || fontSize}
          style={[{ marginRight: 4 }, iconStyle]}
        />
      )}
      <Text style={[styles.text, textStyle, color && { color }, fontSize && { fontSize }]}>{children}</Text>
      {afterIcon && (
        <Icon
          type={afterIcon}
          {...(iconColor && { color: iconColor })}
          size={iconSize || fontSize}
          style={[{ marginRight: 4 }, iconStyle]}
        />
      )}
    </>
  );

  return onPress ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>{content}</View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.container}>{content}</View>
  );
};

export default IconText;
