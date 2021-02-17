import React from 'react';
import { View } from 'react-native';
import { Container, RightSide, IconButton } from './Header.styles';

const HeaderButton = (props) => (
  <IconButton {...props}>{props.children}</IconButton>
);

const Header = (props) => {
  const { left, right } = props;

  return (
    <Container>
      <View>{left}</View>
      <RightSide>{right}</RightSide>
    </Container>
  );
};

Header.Button = HeaderButton;

export default Header;
