import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signUpSucess, signFailure } from './actions';

// -----------------------------------------------------------------------------
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro', 'O usuário não pode ser um prestador');
      yield put(signFailure());

      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Verifique seus dados e tente novamente.'
    );
    // console.tron.log(err.response.data.error);

    yield put(signFailure());
  }
}
// -----------------------------------------------------------------------------
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    const { name: newName, email: newEmail } = response.data;

    yield put(signUpSucess(newName, newEmail));
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      // toast.error(err.response.data.error);
      // console.tron.log(err.response.data.error);
    } else {
      Alert.alert('Falha ao criar cadastro', 'Verifique seus dados.');
      // console.tron.log(err);
    }
    yield put(signFailure());
  }
}
// -----------------------------------------------------------------------------
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

  // console.tron.log(api.defaults.headers.Authorization);
}
// -----------------------------------------------------------------------------
export function signOut() {}
// -----------------------------------------------------------------------------
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
