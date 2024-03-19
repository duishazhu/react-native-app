import React from 'react';
import loadable from '@loadable/component';
import { authRouterArray } from 'configs/navigators/helper';
import { createStackNavigator, TransitionPresets } from '@terminus/react-navigation';

const AuthStack = createStackNavigator();

export default () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      stackAnimation: 'slide_from_right',
      replaceAnimation: 'push',
      cardStyle: { flex: 1 },
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    {authRouterArray.map(({ routeName, screen }) => (
      <AuthStack.Screen key={routeName} getComponent={() => loadable(screen)} name={routeName} />
    ))}
  </AuthStack.Navigator>
);
