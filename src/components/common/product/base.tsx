import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';
import ProductImage from 'common/product-image';
import { baseStyles as styles } from 'common/product/style';

type SubInfo = {
  text: string;
  extra?: string;
  subInfoExtraStyle?: any;
};

interface IProps {
  style?: any;
  imageVisible?: boolean;
  imageUrl: string;
  imageSize?: number;
  imageExtra?: React.ReactElement | React.ReactNode;
  title: string;
  titleExtra?: React.ReactElement | React.ReactNode;
  subInfoList: SubInfo[];
  subInfoListStyle?: any;
  subInfoExtraTextStyle?: any;
}

export default function ProductBase({
  style,
  imageVisible,
  imageUrl,
  imageSize,
  imageExtra,
  title,
  titleExtra,
  subInfoList,
  subInfoListStyle,
  subInfoExtraTextStyle,
  children,
}: PropsWithChildren<IProps>) {
  return (
    <View style={[styles.container, style]}>
      {imageVisible && (
        <View style={[styles.imageContainer, { height: imageSize }]}>
          <ProductImage src={imageUrl} size={imageSize} />
          {imageExtra}
        </View>
      )}
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {titleExtra}
        </View>
        {!!subInfoList?.length && (
          <View style={[styles.subInfoList, subInfoListStyle]}>
            {subInfoList.map((subInfo, index) => {
              return subInfo.extra ? (
                <View key={index} style={[styles.subInfoContainer, subInfo.subInfoExtraStyle]}>
                  <Text style={styles.subInfo}>{subInfo.text}</Text>
                  <Text style={[styles.subInfoExtra, subInfoExtraTextStyle]}>{subInfo.extra}</Text>
                </View>
              ) : (
                <Text style={styles.subInfoText}>{subInfo.text}</Text>
              );
            })}
          </View>
        )}
        {children}
      </View>
    </View>
  );
}

ProductBase.defaultProps = {
  imageVisible: true,
  imageSize: 80,
};
