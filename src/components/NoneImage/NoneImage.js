import React from 'react';
import { NoneImageWrapper } from './NoneImage.styles';
import PhotoLineIcon from '~/assets/icons/icon-photo-line.svg';

const NoneImage = () => {
  return (
    <NoneImageWrapper>
      <PhotoLineIcon />
      <NoneImageWrapper.Text>불러올 수 있는 이미지가 없습니다.</NoneImageWrapper.Text>
    </NoneImageWrapper>
  );
};

export default NoneImage;
