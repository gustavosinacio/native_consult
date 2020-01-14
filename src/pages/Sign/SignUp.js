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

import { signUpRequest } from '~/store/modules/auth/actions';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const lottieRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isAnimating, setIsAnimating] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleAnimationClick() {
    setIsAnimating(true);
    if (!isAnimating) lottieRef.current.play();
  }

  function handleLinkClick() {
    navigation.navigate('SignIn');
  }

  function handleSubmit() {
    // console.tron.log('send');
    dispatch(signUpRequest(name, email, password));
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

        <Form onSubmitEditing={handleSubmit}>
          <FormInput
            icon="person-outline"
            autoCorrect
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <SubmitButton onPress={handleSubmit}>Entrar</SubmitButton>
        </Form>

        <LinkAccount onPress={handleLinkClick}>
          <LinkAccountText>Já tenho uma conta</LinkAccountText>
        </LinkAccount>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
