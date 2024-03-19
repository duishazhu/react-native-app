/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import isNil from 'lodash/isNil';
import ProductBase from 'common/product/base';
import FormatFee from 'common/format-fee';
import Stepper from 'common/stepper';
import Tag from 'common/tag';
import { specificationStyles as styles } from 'common/product/style';
import Modal from 'common/modal/center';
import SkuSelect from 'common/sku-select';
import { Button, Icon } from '@terminus/nusi-mobile';

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
  value?: any;
  skuList: { attr: string; id: number | string; price: number }[];
  onChange?: (value: number) => void;
  onWaitFetchData?: () => Promise<boolean>;
}

// 规格商品,点击架构后选择规格
export default function SpecificationProduct({
  style,
  itemImageUrl,
  itemImageSize,
  itemName,
  itemTotalPrice,
  itemSubInfoList,
  itemTagList,
  itemPrice,
  itemUnit,
  children,
  onChange,
  value,
  onWaitFetchData,
  skuList,
}: PropsWithChildren<IProps>) {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectValue] = useState<any>(value);
  const onSelectAdd = useCallback(async () => {
    if (onWaitFetchData) {
      const isShowModal = await onWaitFetchData();
      if (isShowModal) {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  }, [onWaitFetchData]);

  // eslint-disable-next-line no-shadow
  const onSelectChange = useCallback((value) => {
    setSelectValue(value);
  }, []);

  const handleNext = useCallback(() => {
    onChange?.(selectedValue);
    setVisible(false);
  }, [onChange, selectedValue]);

  const footerExtra = useMemo(() => {
    let total = 0;
    const { price, quantity } = selectedValue || {};
    if (price && quantity) {
      total = price * quantity;
    }
    return (
      <View style={styles.modalFooterContainer}>
        <Text>
          合计
          <FormatFee fee={total} color="#FF8800" />
        </Text>
        <Button style={styles.modalFooterBtn} type="primary" size="large" children="确定" onPress={handleNext} />
      </View>
    );
  }, [handleNext, selectedValue]);
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
        <Stepper
          disabled
          onSelectAdd={onSelectAdd}
          showSelect
          reduceButtonStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#999999',
            borderRadius: 11,
          }}
          reduceIcon={<Icon type="reduce" size={22} />}
          reduceOnPressOut={() => setVisible(true)}
          addButtonStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 11,
            backgroundColor: '#FFE423',
          }}
          addIcon={<Icon type="icon-step-add" size={22} />}
          addOnPressOut={() => {
            setVisible(true);
          }}
          value={selectedValue?.quantity}
        />
      </View>
      {children}
      {/* @ts-ignore */}
      <Modal
        style={{ height: 'auto', minHeight: 250, width: '75%' }}
        visible={visible}
        title={itemName}
        maskClosable
        footerExtra={footerExtra}
        contentStyle={{ paddingBottom: 10 }}
        onClose={() => {
          setVisible(false);
        }}
      >
        {/* @ts-ignore */}
        <SkuSelect skuList={skuList} value={selectedValue} onChange={onSelectChange}>
          <View style={styles.modalSubTitleContainer}>
            <Text style={styles.specificationTitle}>规格</Text>
            <Text style={styles.specificationSubTitle}>限免剩余</Text>
          </View>
        </SkuSelect>
      </Modal>
    </ProductBase>
  );
}
