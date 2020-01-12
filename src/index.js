import 'react-native-gesture-handler';
import '~/config/ReactotronConfig';

import React from 'react';
import { StatusBar } from 'react-native';

import Routes from '~/routes';

function HomeScreen() {
  return (
    <>
      <StatusBar translucent backgroundColor="#0000" barStyle="dark-content" />
      <Routes />
    </>
  );
}

export default HomeScreen;
