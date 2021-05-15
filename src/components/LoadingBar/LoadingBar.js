import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

const LoadingBar = (props) => {
  return (
    <LoadingView marginTop={props.top}>
      <ActivityIndicator size="large" color={props.color} />
    </LoadingView>
  );
};

LoadingBar.defaultProps = {
  color: '#ffbb44',
  top: 0,
};

export default LoadingBar;

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
