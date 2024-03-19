import React, { useState, useMemo } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'common/icon';
import { getStoreList } from 'select-store/helper';
import styles from 'select-store/style';

export default function CitySection({ data, selectStoreId, onSelect }) {
  const [visible, setVisible] = useState(false);

  const storeList = useMemo(() => getStoreList([data]), [data]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible((prev) => !prev)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.name}</Text>
          <Icon type={visible ? 'icon-arrow-down' : 'icon-arrow-right'} size={18} color="#7D7E80" />
        </View>
      </TouchableWithoutFeedback>
      {visible && (
        <>
          {storeList.length ? (
            <View style={styles.storeList}>
              {storeList.map((item) => {
                return (
                  <View key={item.id} style={styles.storeWrap}>
                    <TouchableWithoutFeedback onPress={() => onSelect(item)}>
                      <View style={[styles.store, item.id === selectStoreId ? styles.activeStore : null]}>
                        <Text
                          style={[styles.storeText, item.id === selectStoreId ? styles.activeStoreText : null]}
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
      )}
    </>
  );
}
