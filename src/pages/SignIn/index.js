import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

import { TouchableWithoutFeedback } from 'react-native';
import animationSource from '~/assets/dumbbell.json';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn() {
  const lottie = useRef();

  function handleAnimationClick() {
    console.tron.log('click');
    lottie.current.play();
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
            ref={animation => {
              lottie.current = animation;
            }}
          />
        </TouchableWithoutFeedback>

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite sua senha"
          />
          <SubmitButton onPress={() => {}}>Entrar</SubmitButton>
        </Form>

        <SignLink onPress={() => {}}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
