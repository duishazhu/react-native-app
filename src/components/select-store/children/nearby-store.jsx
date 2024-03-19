import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'common/icon';
import { useCommonPosition } from 'hooks';
import { getNearbyStoreList } from 'select-store/service';
import { commonStyle } from 'styles';
import styles from 'select-store/style';
import 'select-store/index.scss';

export default function NearbyStore({ selectStoreId, onSelect }) {
  const { loading, refresh: fetchLocation } = useCommonPosition();
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const location = await fetchLocation();
    if (location.latitude && location.longitude) {
      const result = await getNearbyStoreList(location);
      setData(result);
    }
  }, [fetchLocation]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>附近门店</Text>
        <TouchableWithoutFeedback disabled={loading} onPress={fetchData}>
          <View style={commonStyle.flexRow}>
            <View className={loading ? 'select-store-location-loading' : ''}>
              <Icon type="re-location" size={16} color="#999999" />
            </View>
            <Text style={styles.reLocation}>重新定位</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {data.length ? (
        <View style={styles.storeList}>
          {data.map((item) => {
            return (
              <View key={item.storeCode} style={styles.storeWrap}>
                <TouchableWithoutFeedback onPress={() => onSelect(item)}>
                  <View style={[styles.store, item.storeCode === selectStoreId ? styles.activeStore : null]}>
                    <Text
                      style={[styles.storeText, item.storeCode === selectStoreId ? styles.activeStoreText : null]}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>暂无门店</Text>
        </View>
      )}
    </>
  );
}
