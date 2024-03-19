import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Radio } from '@terminus/nusi-mobile';
import { radioStyles as styles } from 'common/field/style';

export default function FieldRadio({ options, value, onChange }) {
  return (
    !!options?.length && (
      <View style={styles.container}>
        {options.map((option) => {
          return (
            <View key={option.value} style={styles.itemWrap}>
              <TouchableWithoutFeedback onPress={() => onChange(option.value)}>
                <View style={[styles.item, option.value === value ? styles.activeItem : null]}>
                  <Text style={[styles.itemText, option.value === value ? styles.activeItemText : null]}>
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

export function FieldListRadio({ options, value, onChange }) {
  return (
    !!options?.length &&
    options.map((option, index) => {
      return (
        <Radio
          key={option.value}
          position="left"
          style={[styles.listItem, index === options.length - 1 && styles.listItemNoBorder]}
          textStyle={styles.listItemText}
          value={option.value}
          checked={option.value === value}
          onChange={onChange}
        >
          {option.label}
        </Radio>
      );
    })
  );
}
