import React, { useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { buttonSelectStyles as styles } from 'common/field/style';

export default function FieldButtonSelect({ multiple, options, value, onChange }) {
  const handleChange = useCallback(
    (v) => {
      if (multiple) {
        onChange(value?.includes(v) ? value.filter((item) => item !== v) : [...(value || []), v]);
      } else onChange(v);
    },
    [multiple, onChange, value]
  );

  return (
    !!options?.length && (
      <View style={styles.container}>
        {options.map((option) => {
          const active = multiple ? value?.includes(option.value) : option.value === value;
          return (
            <View key={option.value} style={styles.itemWrap}>
              <TouchableWithoutFeedback onPress={() => handleChange(option.value)}>
                <View style={[styles.item, active ? styles.activeItem : null]}>
                  <Text style={[styles.itemText, active ? styles.activeItemText : null]} numberOfLines={1}>
                    {option.label}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    )
  );
}
