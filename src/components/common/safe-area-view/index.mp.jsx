import React from 'react';
import { SafeAreaView } from 'react-native';
import styles from 'common/safe-area-view/style';

export default (props) => {
  return <SafeAreaView {...props} style={[styles.container, props?.style]} />;
};
