import { defineMessages } from 'utils/react-intl';
import { themes } from 'styles/theme';
import discoverImage from 'images/tab/discover.png';
import discoverFillImage from 'images/tab/discover-fill.png';

const messages = defineMessages({
  Home: {
    id: 'member.basic.discoverPage',
    defaultMessage: '发现',
  },
});

const main = {
  Home: {
    // 组件
    screen: () => import('pages/home'),
    // 路径
    path: 'index',
    // 图标
    tabBarImage: discoverImage,
    tabBarImageFill: discoverFillImage,
    // 导航配置
    title: messages.Home,
  },
};

const aliasMain = {
  AliasHome: {
    // 组件
    screen: () => import('pages/home'),
    // 路径
    path: ':businessType/index',
    // 图标
    tabBarImage: discoverImage,
    tabBarImageFill: discoverFillImage,
    // 导航配置
    title: messages.Home,
  },
};

const Auth = {
  Login: { screen: () => import('pages/login'), path: 'login' },
};

export const basicRouterConfig = {
  Main: main,
  AliasMain: aliasMain,
  mainTabsConfig: {
    tabBarOptions: {
      headerShown: false,
      tabBarActiveTintColor: themes.$primaryColor,
      tabBarInactiveTintColor: themes.$colorTextNote,
    },
  },
  Auth,
};
