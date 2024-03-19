import React from 'react';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';
import { SearchBar as OriginSearchBar } from '@terminus/nusi-mobile';
import { Icon } from 'common/icon';
import Image from 'common/image';
import styles from 'common/search-bar/style';
import searchIcon from 'images/common/search.png';

export default function SearchBar({ style, onScan, children, ...props }) {
  const handleScan = () => {
    Platform.API.scanCode({
      scanType: ['barCode', 'qrCode'],
      success: ({ result }) => onScan(result),
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchWrapper}>
        <OriginSearchBar
          style={styles.input}
          wrapperStyle={styles.wrapper}
          styles={{ inputWrapper: styles.inputWrapper, searchIcon: styles.searchIcon }}
          searchIcon={<Image source={searchIcon} />}
          clearIcon={false}
          {...props}
        />
        {!!onScan && (
          <TouchableWithoutFeedback onPress={handleScan}>
            <View style={styles.scanWrapper}>
              <Icon type="icon-scan" size={16} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      {!!children && <View style={styles.rightContent}>{children}</View>}
    </View>
  );
}
