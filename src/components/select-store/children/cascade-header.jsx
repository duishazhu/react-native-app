import React from 'react';
import { View, Text } from 'react-native';
import isArray from 'lodash/isArray';
import { cascadeStyle as styles } from 'select-store/style';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import Image from 'common/image';
import logoTouxiang from 'images/common/logo-touxiang.png';

export default function CascadeHeader(props) {
  const { selectList, onItemPress, style } = props;
  if (!isArray(selectList) || selectList.length === 0) {
    return (
      <View style={[styles.container, style]}>
        <Image style={{ width: 34, height: 34 }} source={logoTouxiang} />
        <Text style={styles.defaultText}>零食很忙</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback
        onPress={() => {
          onItemPress?.(undefined, -1);
        }}
      >
        <View>
          <Text style={[styles.regionText, styles.allText]}>全国</Text>
        </View>
      </TouchableWithoutFeedback>
      {selectList?.map((item, index) => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.arrow}>{'>'}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              if (index < selectList.length - 1) {
                onItemPress?.(item, index);
              }
            }}
          >
            <View>
              <Text style={styles.regionText}>{item}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  );
}
