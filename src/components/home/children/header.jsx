import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { useCommonData } from '@terminus/mall-base';
import { Icon } from 'common/icon';
import Image from 'common/image';
import useStoreInfo from 'hooks/useStoreInfo';
import styles from 'home/style';
import locationIcon from 'images/home/location.png';

export default function Header() {
  const { user } = useCommonData();
  const { storeInfo } = useStoreInfo();
  const { name } = storeInfo || {};

  return (
    <View style={styles.header}>
      <TouchableWithoutFeedback onPress={() => NavigationService.navigate('SelectStore')}>
        <View style={styles.headerLeft}>
          <Image style={styles.headerLeftIcon} source={locationIcon} />
          <Text style={styles.headerLeftText}>{name || '请选择门店'}</Text>
          <Icon type="icon-arrow-down-black" size={13} />
        </View>
      </TouchableWithoutFeedback>
      {!!user?.id && (
        <TouchableWithoutFeedback onPress={() => NavigationService.navigate('UserCenter')}>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightText}>{user.nickname}</Text>
            <Icon type="icon-arrow-right" size={12} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
