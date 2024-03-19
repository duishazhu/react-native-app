import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import isNil from 'lodash/isNil';
import { Icon } from 'common/icon';
import { tapStyles as styles } from 'common/field/style';

export default function Tap({ style, disabled, children, placeholder, text, onPress }) {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={[styles.tapContainer, style]}>
        <View style={styles.tapContent}>
          {children || (
            <Text style={isNil(text) ? styles.tapPlaceholder : styles.tapText}>{isNil(text) ? placeholder : text}</Text>
          )}
        </View>
        <Icon type="icon-arrow-right" size={18} color="#969799" />
      </View>
    </TouchableWithoutFeedback>
  );
}
