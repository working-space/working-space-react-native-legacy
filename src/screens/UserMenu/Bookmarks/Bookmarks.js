import React from 'react';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, HeaderText } from './Bookmarks.styles';

const Bookmarks = ({ navigation }) => {
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
        <HeaderText>즐겨찾기</HeaderText>
      </Container>
    </>
  );
};

export default Bookmarks;
