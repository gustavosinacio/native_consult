import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/githubApi';
import { mainTextColor } from '~/assets/colors';
import {
  ContainerView,
  FormView,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
} from './styles';

export default function Form({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const [newUser, setNewUser] = useState('');

  async function handleAddUser() {
    setLoading(true);
    try {
      const response = await api.get(`/users/${newUser}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };
      setUsers(users.concat(data));
      setNewUser('');
    } catch (err) {
      //
    }
    setLoading(false);
    Keyboard.dismiss();
  }

  function handleClickUserCard(user) {
    navigation.navigate('User', { user });
  }

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    // console.tron.log(AsyncStorage.getAllKeys());

    async function getAsyncStorage() {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      // console.tron.log('get', AsyncStorage.getAllKeys());
    }
    getAsyncStorage();
  }, []);

  return (
    <ContainerView>
      <FormView>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Add item"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color={mainTextColor} size={30} />
          ) : (
            <Icon name="add" size={30} color={mainTextColor} />
          )}
        </SubmitButton>
      </FormView>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User onPress={() => handleClickUserCard(item)}>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
          </User>
        )}
      />
    </ContainerView>
  );
}

Form.navigationOptions = {
  title: 'Github Users',
};

Form.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
