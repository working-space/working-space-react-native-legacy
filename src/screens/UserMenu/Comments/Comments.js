import React from 'react';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, HeaderText } from './Comments.styles';

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
      </Container>
    </>
  );
};

export default Comments;
