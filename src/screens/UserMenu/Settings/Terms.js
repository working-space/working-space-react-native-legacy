import React from 'react';
import { Container, Text, Viewer } from './Terms.styles';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';

const Terms = ({ navigation, route }) => {
  const { content } = route.params;

  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.goBack()}>
            <BackIcon />
          </Header.Button>
        }
      />
      <Container>
        <Viewer>
          <Text>{content}</Text>
        </Viewer>
      </Container>
    </>
  );
};

export default Terms;
