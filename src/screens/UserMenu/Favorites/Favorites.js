import React from 'react';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, HeaderText } from './Favorites.styles';

const Favorites = ({ navigation }) => {
  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.navigate('Main')}>
            <BackIcon />
          </Header.Button>
        }
      />
      <Container>
        <HeaderText>좋아요 누른 작업공간</HeaderText>
      </Container>
    </>
  );
};

export default Favorites;
