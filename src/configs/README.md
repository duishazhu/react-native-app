### 项目配置项

> 用于优先执行的代码，如初始化 fetch 配置， 其他相关的配置信息

项目的 index 中调用此处文件

- 导航配置
- 登录鉴权配置
- commonData 配置
- 装修配置

```javascript
// 监听state变化
import { createAppContainer, createStackNavigator } from 'react-navigation';
import analytics from '@react-native-firebase/analytics';

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = createStackNavigator(AppRouteConfigs);
const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <AppContainer
    onNavigationStateChange={(prevState, currentState, action) => {
      const currentRouteName = getActiveRouteName(currentState);
      const previousRouteName = getActiveRouteName(prevState);

      if (previousRouteName !== currentRouteName) {
        // the line below uses the @react-native-firebase/analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        analytics().setCurrentScreen(currentRouteName, currentRouteName);
      }
    }}
  />
);
```
