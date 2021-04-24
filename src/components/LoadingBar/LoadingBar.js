import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from '@emotion/native';

const LoadingBar = () => {
  return (
    <LoadingView>
      <ActivityIndicator size="large" color="#ffbb44" />
    </LoadingView>
  );
};

export default LoadingBar;

const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
