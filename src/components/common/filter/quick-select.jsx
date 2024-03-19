import React, { useCallback } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';
import { quickSelectStyles as styles } from 'common/filter/style';

export default function FilterQuickSelect({ style, multiple, options, value, onChange }) {
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
      <View style={style}>
        <ScrollView contentContainerStyle={styles.container} horizontal>
          {options.map((option) => {
            const selected = multiple ? value?.includes(option.value) : option.value === value;
            return (
              <TouchableWithoutFeedback key={option.value} onPress={() => handleChange(option.value)}>
                <View style={[styles.item, selected && styles.selectedItem]}>
                  <Text style={[styles.itemText, selected && styles.selectedItemText]} numberOfLines={1}>
                    {option.label}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    )
  );
}
