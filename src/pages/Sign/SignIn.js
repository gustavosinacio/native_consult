import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import { TouchableWithoutFeedback } from 'react-native';
import animationSource from '~/assets/dumbbell.json';

import Background from '~/components/Background';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LinkAccount,
  LinkAccountText,
} from './styles';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const lottieRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isAnimating, setIsAnimating] = useState(true);

  function handleAnimationClick() {
    setIsAnimating(true);
    if (!isAnimating) lottieRef.current.play();
  }

  function handleLinkClick() {
    navigation.navigate('SignUp');
  }

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <TouchableWithoutFeedback onPress={handleAnimationClick}>
          <LottieView
            style={{ width: '60%' }}
            name="chart-arc"
            source={animationSource}
            autoPlay
            loop={false}
            ref={lottieRef}
            onAnimationFinish={() => setIsAnimating(false)}
          />
        </TouchableWithoutFeedback>

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite sua senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Entrar</SubmitButton>
        </Form>

        <LinkAccount onPress={handleLinkClick}>
          <LinkAccountText>Criar conta gratuita</LinkAccountText>
        </LinkAccount>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
