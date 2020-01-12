import React from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';

import { StyledFormIcon } from './styles';

const FormIcon = () => {
  function onPressIn() {
    // console.tron.log('pressIn');
  }

  function onPressOut() {
    // console.tron.log('pressOut');
  }

  function onPress() {
    AsyncStorage.setItem('users', JSON.stringify([]));
  }

  function onLongPress(...args) {
    console.tron.log(...args);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}>
      <StyledFormIcon size={30} name="format-align-right" />
    </TouchableOpacity>
  );
};

export default FormIcon;
