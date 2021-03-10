import React from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';
import { Container, RightSide, IconButton } from './Header.styles';

const HeaderButton = (props) => <IconButton {...props}>{props.children}</IconButton>;

const Header = (props) => {
  const { left, right, bottom, showBorderBottom } = props;

  return (
    <Container
      style={
        showBorderBottom &&
        css`
          border-bottom-width: 1px;
          border-style: solid;
          border-color: #f0f0f0;
        `
      }>
      <Container.Top>
        <View>{left}</View>
        <RightSide>{right}</RightSide>
      </Container.Top>
      <Container.Bottom>{bottom}</Container.Bottom>
    </Container>
  );
};

Header.Button = HeaderButton;

Header.defaultProps = {
  showBorderBottom: false,
};

export default Header;
