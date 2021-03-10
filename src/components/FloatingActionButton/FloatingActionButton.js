import React from 'react';
import { Button } from './FloatingActionButton.styles';

const FloatingActionButton = (props) => {
  return (
    <Button activeOpacity={0.5} {...props}>
      {props.children}
    </Button>
  );
};

export default FloatingActionButton;
