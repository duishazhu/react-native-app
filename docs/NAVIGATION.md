# 路由

基于目前的项目结构将路由进行优化划分

- 引导页、广告页路由
- 业务路由
  - 底部 BottomTab
  - 常规页面路由
- 用户登录认证(Auth)

### 页面路由配置

#### h5&rn

新建业务页面之后，需要添加路由配置。

1. 常规页面导出

   ```
       export DemoPage from 'pages/demo'
   ```

2. 指定页面属性,routeName,path 等

   ```
   import DemoPage from 'pages/demo'
   const screen = {
       Demo: DemoPage,       // Demo 表示routeName
       path: '/demo/page',   // 自定义页面路径
       navigationOptions: {  // 自定义页面标题属性
           title: ''
       }
   }
   ```

配置页面路由

```
#在navigation.json 文件中添加路由配置

const screens = {
    guide:[
        {
            pagePath: '/pages/guide',
            routeName: 'Guide'
        }
    ],
    bottomTabs:[             //底部bottom
        {
            pagePath: '/pages/home',
            routeName: 'Home',
            path:'Home'
        },
        {
            pagePath: '/pages/category',
            routeName: 'Category',
            path:'Category'
        }
    ],
    business:[               //业务路由包含底部tab
      {
          pagePath: '/pages/item/detail',
          routeName: 'Item',
          path:'item/:itemId'
      }
    ],
    auth: [                 // 权限校验
       {
           pagePath: '/pages/login',
           routeName: 'Login',
           path:'login'
       }
    ]
}
export default screens
```

#### 小程序路由配置

微信小程序路由需要在 小程序入口文件里面进行配置

```
#src/mp_app.tsx

import React from 'react'
import { Route, Router, TabRouter } from '@terminus/octopus-router'

import ComponentsList from './pages/demo/components-list'
import ImageDemo from './pages/demo/components/Image'
import TextDemo from './pages/demo/components/Text'


class Index extends React.Component {
  render() {
    const { children } = this.props
    return (
      <>
      <Router
        navigationOptions={{
          navigationBarTitleText: 'Hellow World',
          navigationBarBackgroundColor: '#eee',
          navigationBarTextStyle: 'white',
        }}
      >
        <TabRouter text='主页' image='' selectedImage=''>
          <Route name={'ComponentsList'} component={ComponentsList} />
          <Route name={'ImageDemo'} component={ImageDemo}/>
          <Route name={'TextDemo'} component={TextDemo}/>
        </TabRouter>
      </Router>
      {children}
      </>
    )
  }
}

export default Index
```

_注意_
`小程序路由里面的name就是对应rn的routeName,同一个模块routeName一定要保持一致，否则路由无法统一跳转`

### 路由跳转

为了保证微信小程序 跟 RN 路由保持一致，路由跳转如下

```
import { NavigationService } from '@terminus/react-navigation'

# 跳转下一页面
NavigationService.navigate(routeName,params)  // routeName: 路由名称，params: 路由参数

# 返回上一级页面
NavigationService.pop()
```
