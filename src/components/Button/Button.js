import React from 'react';
import { Container, Label } from './Button.styles';

const Button = ({ label, onPress }) => {
  return (
    <Container onPress={onPress}>
      <Label>{label}</Label>
    </Container>
  );
};

export default Button;
