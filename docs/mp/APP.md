# 入口文件

入口文件需要被 cli 编译时静态检查收集小程序 app 配置信息、收集路由信息注册页面，因此需要足够静态。但这个页面相当于 web 的 root component, 小程序其他页面会作为 portal component 挂在到上面，全局状态权限可以在这个地方处理

## demo

```typescript react
import React from 'react';
import { Route, Router, TabRouter } from '@terminus/octopus-router';

import BasicComponent from './pages/basicComponents/index';
import TextInput from './pages/basicComponents/textinput/index';
import Button from './pages/basicComponents/button/index';
import Image from './pages/basicComponents/image/index';
import ScrollView from './pages/basicComponents/scroll-view/index';
import TouchableHighlight from './pages/basicComponents/touchablehighlight/index';
import Text from './pages/basicComponents/text/index';
import ActivityIndicator from './pages/basicComponents/activity-indicator/index';
import EventClick from './pages/basicComponents/event/click';
class Index extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Router
          navigationOptions={{
            navigationBarTitleText: 'octopus demo',
            navigationBarBackgroundColor: '#eee',
            navigationBarTextStyle: 'white',
          }}
        >
          <Route name={'BasicComponent'} component={BasicComponent} />
          <Route name={'Button'} component={Button} />
          <Route name={'Image'} component={Image} />
          <Route name={'Text'} component={Text} />
          <Route name={'TextInput'} component={TextInput} />
          <Route name={'TouchableHighlight'} component={TouchableHighlight} />
          <Route name={'ActivityIndicator'} component={ActivityIndicator} />
          <Route name={'EventClick'} component={EventClick} />
          <Route name={'ScrollView'} component={ScrollView} />
        </Router>
        {children}
      </>
    );
  }
}

export default Index;
```
