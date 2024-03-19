import React, { useCallback, useContext } from 'react';
import { View, Text } from 'react-native';
import { Button } from '@terminus/nusi-mobile';
import FormatFee from 'common/format-fee';
import styles from '../style';
import { ProductContext } from '../product-context';

const FooterView = (props) => {
  const { handleNext } = props;
  const { selectedProducts } = useContext(ProductContext);
  let total = 0;
  selectedProducts?.forEach((value) => {
    const { price, selectCount } = value || {};
    if (price && selectCount) {
      total += price * selectCount;
    }
  });

  const confirm = useCallback(() => {
    const selectedList = selectedProducts ? Array.from(selectedProducts.values()) : null;
    handleNext?.(selectedList, selectedProducts);
  }, [handleNext, selectedProducts]);

  return (
    <View style={styles.footerContainer}>
      <Text>
        合计
        <FormatFee fee={total} color="#FF8800" />
      </Text>
      <Button style={styles.footerBtn} type="primary" size="large" children="下一步" onPress={confirm} />
    </View>
  );
};

export default FooterView;
