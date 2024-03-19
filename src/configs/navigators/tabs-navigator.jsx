import React from 'react';
import { isWechat } from 'utils/platform';
import { useIntl } from 'utils/react-intl';
import { basicRouterConfig } from 'routers/basic';
import { wechatAuthorize } from 'utils/unauthorized';
import { useCommonData } from '@terminus/mall-base';
import { AsyncStorage } from '@terminus/nusi-mobile';
import { Text, StyleSheet, Image } from 'react-native';
import loadable from '@loadable/component';
import { mainRouterArray, aliasMainRouterArray } from 'configs/navigators/helper';
import { createBottomTabNavigator } from '@terminus/react-navigation';
import { AUTHORIZED_FROM } from 'common/constants';

const { mainTabsConfig } = basicRouterConfig;

// 主页tab导航
const Tabs = createBottomTabNavigator();

const TabText = ({ color, position, title }) => {
  const { formatMessage } = useIntl();

  return (
    <Text
      numberOfLines={1}
      style={[styles.label, { color }, position === 'beside-icon' ? styles.labelBeside : styles.labelBeneath]}
    >
      {typeof title === 'string' || !title ? title : formatMessage(title)}
    </Text>
  );
};

function TabsNavigator({ routes, authorizedRoutes, options = {}, ...props }) {
  const { user = {} } = useCommonData();
  return (
    <Tabs.Navigator screenOptions={mainTabsConfig.tabBarOptions}>
      {routes.map(({ routeName, screen, title, tabBarImageFill, tabBarImage }) => {
        const listeners = ({ navigation }) => ({
          tabPress: async (e) => {
            if (authorizedRoutes.includes(routeName) && !user.id) {
              e.preventDefault();
              await AsyncStorage.set(AUTHORIZED_FROM, JSON.stringify({ routeName }));
              if (isWechat) {
                wechatAuthorize('replace');
                return;
              }
              navigation.navigate('Auth', { screen: 'Login' });
            }
          },
        });

        return (
          <Tabs.Screen
            name={routeName}
            key={routeName}
            getComponent={() => loadable(screen)}
            listeners={listeners}
            options={{
              // 自定义label
              tabBarLabel: ({ ...textProps }) => <TabText {...textProps} title={title} />,
              // 自定义icon
              tabBarIcon: ({ focused, size }) => (
                <Image source={focused ? tabBarImageFill : tabBarImage} style={{ width: size, height: size }} />
              ),
              ...options,
              // 自定义badge
              // tabBarBadge: 1,
              // 自定义badge样式
              // tabBarBadgeStyle: {}
            }}
            {...props}
          />
        );
      })}
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  labelBeneath: {
    fontSize: 10,
  },
  labelBeside: {
    fontSize: 13,
    marginLeft: 20,
    marginTop: 3,
  },
});

// 用于主页tab
export const MainTab = () => <TabsNavigator routes={mainRouterArray} authorizedRoutes={['MemberCenter']} />;

// 用于o2o Tab
export const AliasMainTab = () => (
  <TabsNavigator
    routes={aliasMainRouterArray}
    authorizedRoutes={['AliasMemberCenter']}
    initialParams={{ businessType: '' }}
  />
);
