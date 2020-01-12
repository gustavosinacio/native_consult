import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FormIcon from '~/icons/FormIcon';

import SignIn from '~/pages/Sign/SignIn';
import SignUp from '~/pages/Sign/SignUp';
import Form from '~/pages/Form';
import User from '~/pages/User';

import { mainColor, mainTextColor } from '~/assets/colors';

const githubStack = {
  Form,
  User,
};
const githubStackOptions = {
  initialRouteName: 'Form',
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerShown: false,
    headerRight: () => <FormIcon />,
    headerStyle: {
      backgroundColor: mainColor,
    },
    headerTintColor: mainTextColor,
  },
};

const Routes = createSwitchNavigator({
  SignIn,
  SignUp,
});

export default createAppContainer(Routes);
