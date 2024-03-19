# 基础组件

基础组件可以从一下两种方式进行引入

- [react-native](https://facebook.github.io/react-native/docs/activityindicator)
- [Nusi-Mobile Components](http://nusi-mobile.terminus.io/zh/docs/INTRODUCTION)

### react-native components

目前 0.61.5 的 react-native 将部分组件从基础库中移除，交给社区进行维护。

**<font color=#ff0000>已经移除的组件如下</font>**

- webview

  webview 从基础库中移除之后，可以采用`react-native-webview`进行替换。使用方式跟 webview 完全一致

        ```
        import React, { Component } from 'react';
        import { StyleSheet, Text, View } from 'react-native';
        import { WebView } from 'react-native-webview';

        // ...
        class MyWebComponent extends Component {
           render() {
             return (
               <WebView source={{ uri: 'https://facebook.github.io/react-native/' }} />
              );
           }
        }

        ```

- NetInfo

  获取网络状态及监听网络变化。可以采用`@react-native-community/netinfo`进行替代

        ```
        #Get the network state once:
        NetInfo.fetch().then(state => {
           console.log("Connection type", state.type);
           console.log("Is connected?", state.isConnected);
        });

        #Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
        });

        // Unsubscribe
        unsubscribe();
        ```

- ListView

  已经从基础库移除，并且官方不再建议使用该组件。推荐使用更高效的列表组件`FlatList`,`SectionList`
  如何不想放弃使用 ListView 组件，可引入[`deprecated-react-native-listview`](https://www.npmjs.com/package/deprecated-react-native-listview)组件

- SwipeableListView

  已经从基础库移除，并且官方不再建议使用该组件。推荐使用更高效的列表组件`FlatList`,`SectionList`
  如何不想放弃使用 SwipeableListView 组件，可引入[`deprecated-react-native-swipeable-listview`](https://www.npmjs.com/package/deprecated-react-native-swipeable-listview)组件

- CameraRoll

  可以使用[`react-native-cameraroll`](https://github.com/react-native-community/react-native-cameraroll)进行替换

- ImageStore

  如果想获取本地图片信息，可以使用[`react-native-fs`](https://github.com/itinance/react-native-fs)组件进行处理

        ```
        readFile(filepath, 'base64')
        ```

- ImageEditor

  可以使用[`react-native-image-editor`](https://github.com/react-native-community/react-native-image-editor)组件替换

- ViewPagerAndroid

  可以使用[`react-native-viewpager`](https://github.com/react-native-community/react-native-viewpager)组件替换

**<font color=#FF0000>计划移除的组件如下</font>**

- ART

  可以采用[`@react-native-community/art`](https://github.com/react-native-community/art)替代

- CheckBox

  可以采用[`@react-native-community/checkbox`](https://github.com/react-native-community/react-native-checkbox)替代

- DatePickerIOS

  可采用[`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker)替代

- MaskedViewIOS

  可采用[`@react-native-community/masked-view`](https://github.com/react-native-community/react-native-masked-view)替代

- Slider

  可采用[`@react-native-community/slider`](https://github.com/react-native-community/react-native-slider)替代

- AsyncStorage
  native 端存储 API
  可采用[`@react-native-community/async-storage`](https://github.com/react-native-community/react-native-async-storage)替代

- DatePickerAndroid

  可采用[`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker)替代

- ImagePickerIOS

  可以采用[`@react-native-community/react-native-image-picker`](https://github.com/react-native-community/react-native-image-picker)替代

- PushNotificationIOS

  可以采用[`@react-native-community/push-notification-ios`](https://github.com/react-native-community/react-native-push-notification-ios)替换

- StatusBarIOS

  可以采用`StatusBar`进行替换

- TimePickerAndroid

  可以采用[`@react-native-community/datetimepicker`](https://github.com/react-native-community/react-native-datetimepicker)替换

- SegmentedContral

  由于 ios 13 已经不支持 tintColor，在 common 组件中重新实现
