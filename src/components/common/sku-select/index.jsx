import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Stepper from 'common/stepper';
import { formatPrice } from 'common/helper';
import styles from 'common/sku-select/style';

export default function SkuSelect({ style, children, skuList, value, onChange }) {
  if (skuList?.length) {
    return (
      <View style={style} className="common-sku-select-container">
        <View style={styles.header}>{children}</View>
        <View style={styles.skuList}>
          {skuList.map((sku) => {
            const selected = sku.id === value?.id;
            const disabled = false;
            return (
              <TouchableWithoutFeedback key={sku.id} disabled={disabled} onPress={() => !selected && onChange(sku)}>
                <View style={[styles.sku, selected && styles.selectedSku]}>
                  <Text
                    style={[styles.skuText, disabled && styles.disabledSkuText, selected && styles.selectedSkuText]}
                  >
                    {sku.attr}
                  </Text>
                  <View style={[styles.split, disabled && styles.disabledSplit, selected && styles.selectedSplit]} />
                  <Text
                    style={[styles.skuText, disabled && styles.disabledSkuText, selected && styles.selectedSkuText]}
                  >
                    ¥{formatPrice({ price: sku.price })}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <Stepper
          style={styles.stepper}
          size="small"
          min={0}
          value={value?.quantity}
          disabled={!value?.id}
          onChange={(quantity) => onChange({ ...value, quantity })}
        />
      </View>
    );
  }
  return null;
}
