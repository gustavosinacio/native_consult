import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  StarsList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation }) {
  const user = navigation.getParam('user');

  const [page, setPage] = useState(2);
  const [stars, setStars] = useState([]);

  async function getNextPage() {
    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    setStars(stars.concat(response.data));
    setPage(page + 1);
  }

  useEffect(() => {
    async function getStars() {
      const response = await api.get(`/users/${user.login}/starred?page=1`);
      setStars(response.data);
    }

    getStars();
  }, [user.login]);

  useEffect(() => {
    console.tron.log({ stars, user });
  }, [stars, user]);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <StarsList
        data={stars}
        keyExtractor={star => `${star.id}`}
        onEndReached={getNextPage}
        renderItem={({ item }) => (
          <Starred>
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

User.navigationOptions = ({ navigation }) => {
  const user = navigation.getParam('user');

  return {
    title: user.name,
  };
};
