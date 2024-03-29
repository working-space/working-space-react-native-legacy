import React from 'react';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, HeaderText } from './Favorites.styles';
import Header from '~/components/Header/Header';
import NoneData from '~/components/NoneData/NoneData';

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
        <NoneData text="등록된 작업공간이 없습니다." />
      </Container>
    </>
  );
};

export default Favorites;
