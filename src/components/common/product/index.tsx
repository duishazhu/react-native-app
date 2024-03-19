import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import isNil from 'lodash/isNil';
import { StepperProps } from '@terminus/nusi-mobile/lib/stepper/interface';
import ProductBase from 'common/product/base';
import FormatFee from 'common/format-fee';
import Stepper from 'common/stepper';
import Tag from 'common/tag';
import styles from 'common/product/style';

interface IProps {
  style?: any;
  itemImageUrl: string;
  itemImageSize?: number;
  itemName: string;
  itemTotalPrice?: number | string;
  itemSubInfoList?: string[];
  itemTagList?: string[];
  itemPrice: number | string;
  itemUnit: string;
  quantity?: StepperProps;
}

export default function Product({
  style,
  itemImageUrl,
  itemImageSize,
  itemName,
  itemTotalPrice,
  itemSubInfoList,
  itemTagList,
  itemPrice,
  itemUnit,
  quantity,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <ProductBase
      style={style}
      imageUrl={itemImageUrl}
      imageSize={itemImageSize}
      title={itemName}
      titleExtra={!isNil(itemTotalPrice) && <FormatFee fee={itemTotalPrice} />}
      subInfoList={itemSubInfoList?.length ? itemSubInfoList.map((text) => ({ text })) : []}
    >
      {!!itemTagList?.length && (
        <View style={styles.tagList}>
          {itemTagList.map((itemTag, index) => (
            <Tag key={index} style={styles.tag} size="small" type="warning">
              {itemTag}
            </Tag>
          ))}
        </View>
      )}
      <View style={styles.footer}>
        <FormatFee fee={itemPrice} showUnit unit={itemUnit} color={!isNil(itemTotalPrice) ? '#333333' : '#FF8800'} />
        {!!quantity && <Stepper {...quantity} />}
      </View>
      {children}
    </ProductBase>
  );
}
