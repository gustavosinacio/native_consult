import styled from 'styled-components/native';

import { Platform } from 'react-native';
import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin: 5px 0;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;

export const LinkAccount = styled.TouchableOpacity`
  margin-top: 10px;
`;

export const LinkAccountText = styled.Text`
  color: #fffa;
  font-size: 16px;
`;
