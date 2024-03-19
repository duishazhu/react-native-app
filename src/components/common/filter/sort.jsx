import React, { useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'common/icon';
import { sortStyles as styles } from 'common/filter/style';

export default function FilterSort({ style, children, value, onChange }) {
  const handlePress = useCallback(() => {
    if (value) {
      if (value === 'desc') {
        onChange('asc');
      } else onChange();
    } else onChange('desc');
  }, [onChange, value]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        <Text style={[styles.text, !!value && styles.activeText]}>{children}</Text>
        <Icon type={value || 'sort'} size={10} />
      </View>
    </TouchableWithoutFeedback>
  );
}
