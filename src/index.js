import 'react-native-gesture-handler';
import '~/config/ReactotronConfig';

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { store, persistor } from '~/store';

import Routes from '~/routes';

function HomeScreen() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          translucent
          backgroundColor="#0000"
          barStyle="dark-content"
        />
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default HomeScreen;
