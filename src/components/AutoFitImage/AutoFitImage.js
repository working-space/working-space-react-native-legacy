import React from 'react';
import { Image, Dimensions } from 'react-native';
import { css } from '@emotion/native';

const AutoFitImage = (props) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width);

  return (
    <Image
      {...props}
      style={css`
        width: 100%;
        height: ${`${imageHeight}px`};
      `}
      resizeMode="contain"
    />
  );
};

export default AutoFitImage;
