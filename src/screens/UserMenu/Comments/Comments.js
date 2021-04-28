import React from 'react';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, HeaderText } from './Comments.styles';
import Header from '~/components/Header/Header';
import NoneData from '~/components/NoneData/NoneData';

const Comments = ({ navigation }) => {
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
        <HeaderText>작성한 리뷰</HeaderText>
        <NoneData text="작성된 리뷰가 없습니다." />
      </Container>
    </>
  );
};

export default Comments;
