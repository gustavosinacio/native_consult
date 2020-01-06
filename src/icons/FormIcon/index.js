import React from 'react';
import { TouchableOpacity } from 'react-native';

import { StyledFormIcon } from './styles';

const FormIcon = () => {
  function onPressIn() {
    console.tron.log('pressIn');
  }

  function onPressOut() {
    console.tron.log('pressOut');
  }

  return (
    <TouchableOpacity onPressIn={onPressIn} onPressOut={onPressOut}>
      <StyledFormIcon size={30} name="format-align-right" />
    </TouchableOpacity>
  );
};

export default FormIcon;
