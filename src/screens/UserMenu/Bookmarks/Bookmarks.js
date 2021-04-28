import React from 'react';
import { Container, HeaderText } from './Bookmarks.styles';
import Header from '~/components/Header/Header';
import NoneData from '~/components/NoneData/NoneData';
import BackIcon from '~/assets/icons/icon_back.svg';

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
        <NoneData text="등록된 작업공간이 없습니다." />
      </Container>
    </>
  );
};

export default Bookmarks;
