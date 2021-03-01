import React from 'react';
import { Image } from 'react-native';
import { isEmpty } from 'lodash';
import SmallCameraIcon from '~/assets/icons/icon_small_camera.svg';
import SmallEditIcon from '~/assets/icons/icon_small_edit.svg';
import { Container, EditProfile, EditImage, EditName } from './SetProfile.styles';

const SetProfile = (props) => {
  const { userData } = props;
  return (
    <Container>
      <EditProfile>
        <EditImage>
          <EditImage.Photo>{isEmpty(userData.profileImage) ? <SmallCameraIcon /> : <Image source={userData.profileImage} />}</EditImage.Photo>
          <EditImage.Icon>
            <SmallCameraIcon />
          </EditImage.Icon>
        </EditImage>
        <EditName>
          <EditName.Text>{userData.nickname}</EditName.Text>
          <EditName.Icon>
            <SmallEditIcon />
          </EditName.Icon>
        </EditName>
      </EditProfile>
    </Container>
  );
};

export default SetProfile;
