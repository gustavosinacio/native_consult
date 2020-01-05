import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

import { mainColor } from './assets/color';

const HeaderRight = () => (
  <Text style={{ color: '#fff' }}>Animated Icon here</Text>
);

const Routes = createStackNavigator(
  // RoutesConfig
  {
    Main,
    User,
  },
  // StackNavigatorConfig
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerShown: true,
      headerRight: () => <HeaderRight />,
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTintColor: '#fff',
    },
  }
);

export default createAppContainer(Routes);
