import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { mainTextColor } from '../../assets/colors';
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
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Form() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  async function handleAddUser() {
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    setUsers(users.concat(data));
    setNewUser('');

    Keyboard.dismiss();
  }

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
        <SubmitButton onPress={handleAddUser}>
          <Icon name="add" size={30} color={mainTextColor} />
        </SubmitButton>
      </FormView>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => {
          console.tron.log(item);
          return (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          );
        }}
      />
    </ContainerView>
  );
}
