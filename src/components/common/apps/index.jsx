import React, { useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationService } from '@terminus/react-navigation';
import { cdnPath } from '@terminus/mall-utils';
import Image from 'common/image';
import { browseApp } from 'common/apps/service';
import styles from 'common/apps/style';

export default function Apps({ title, data }) {
  const handlePress = useCallback((item) => {
    if (item.local) {
      NavigationService.navigate(item.path);
    } else {
      browseApp(item.key);
    }
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.appsContainer}>
        {data.map((item) => {
          return (
            <TouchableWithoutFeedback key={item.key} onPress={() => handlePress(item)}>
              <View style={styles.appContainer}>
                <Image style={styles.appIcon} source={{ uri: cdnPath({ src: item.image, width: 30, height: 30 }) }} />
                <Text style={styles.appName}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </>
  );
}
