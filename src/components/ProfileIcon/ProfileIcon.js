import React from 'react';
import { Container } from './ProfileIcon.styles';
import SmallPersonIcon from '~/assets/icons/icon_small_person.svg';

const ProfileIcon = (props) => {
  // TODO: 유저 프로필 이미지가 존재하지 않을 때만 SmallPersonIcon이 표시되도록 처리할 것
  return (
    <Container {...props}>
      <SmallPersonIcon />
    </Container>
  );
};

export default ProfileIcon;
