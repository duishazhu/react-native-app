# page

正常的写法

```typescript react
import React, { useState } from 'react';
import { View, Text } from '@terminus/octopus-core';
import { ScrollView } from '@terminus/react-native-octopus';
import { MPage } from '@/common';

const scrollViewItem = {
  height: '150px',
};
const demoText1 = {
  backgroundColor: '#1AAD19',
};
const demoText2 = {
  backgroundColor: '#2782D7',
};
const demoText3 = {
  backgroundColor: '#F1F1F1',
};

const scrollViewRow = {
  height: '150px',
  width: '100%',
  'white-space': 'nowrap',
};

const scrollViewRowItem = {
  height: '150px',
  width: '100%',
  display: 'inline-block',
};
export default () => {
  return (
    <MPage
      title="button"
      navigation={{
        title: 'button',
        bgColor: '#000',
      }}
    >
      <View>
        <Text>ScrollView 纵向滚动</Text>
      </View>
      <ScrollView style={scrollViewItem}>
        <View style={{ ...scrollViewItem, ...demoText1 }}>
          <Text>A</Text>
        </View>
        <View style={{ ...scrollViewItem, ...demoText2 }}>
          <Text>B</Text>
        </View>
        <View style={{ ...scrollViewItem, ...demoText3 }}>
          <Text>C</Text>
        </View>
      </ScrollView>
      <View>
        <Text>ScrollView 横向滚动</Text>
      </View>
      <ScrollView style={scrollViewRow} horizontal={true}>
        <View style={{ ...scrollViewRowItem, ...demoText1 }}>
          <Text>A</Text>
        </View>
        <View style={{ ...scrollViewRowItem, ...demoText2 }}>
          <Text>B</Text>
        </View>
        <View style={{ ...scrollViewRowItem, ...demoText3 }}>
          <Text>C</Text>
        </View>
      </ScrollView>
    </MPage>
  );
};
```
