import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Form from './pages/Form';
import User from './pages/User';
import FormIcon from './icons/FormIcon';

import { mainColor, mainTextColor } from './assets/colors';

const Routes = createStackNavigator(
  // RoutesConfig
  {
    Form,
    User,
  },
  // StackNavigatorConfig
  {
    initialRouteName: 'Form',
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerShown: true,
      headerRight: () => <FormIcon />,
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTintColor: mainTextColor,
    },
  }
);

export default createAppContainer(Routes);
