import React, { useCallback } from 'react';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from 'common/tabs/style';

export default function Tabs({
  style,
  keyMap,
  titleMap,
  scroll,
  tabs,
  activeTab,
  onChange,
  itemStyle,
  activeTabLineStyle,
}) {
  const handlePress = useCallback(
    (tab) => {
      if (activeTab !== tab[keyMap]) {
        onChange(tab[keyMap]);
      }
    },
    [activeTab, keyMap, onChange]
  );

  const renderItem = useCallback(
    (item) => {
      const isActive = activeTab === item[keyMap];
      return (
        <TouchableWithoutFeedback key={item[keyMap]} onPress={() => handlePress(item)}>
          <View style={[scroll ? styles.scrollTab : styles.tab, itemStyle]}>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{item[titleMap]}</Text>
            {isActive && <View style={[styles.activeTabLine, activeTabLineStyle]} />}
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [activeTab, handlePress, keyMap, scroll, titleMap, itemStyle, activeTabLineStyle]
  );

  if (scroll) {
    return (
      <View>
        <ScrollView contentContainerStyle={[styles.container, style]} horizontal>
          {tabs.map(renderItem)}
        </ScrollView>
      </View>
    );
  }

  return <View style={[styles.container, style]}>{tabs.map(renderItem)}</View>;
}

Tabs.defaultProps = {
  keyMap: 'key',
  titleMap: 'title',
};
