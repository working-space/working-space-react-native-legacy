import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { isEmpty } from 'lodash';
import { Container, EditProfile, EditImage, EditName } from './SetProfile.styles';
import SmallCameraIcon from '~/assets/icons/icon_small_camera.svg';
import SmallPersonIcon from '~/assets/icons/icon_small_person.svg';
import SmallEditIcon from '~/assets/icons/icon_small_edit.svg';

const SetProfile = ({ nickname, profileImage, onSetProfileImage }) => {
  const handleClick = useCallback(() => {
    onSetProfileImage?.();
  }, [onSetProfileImage]);

  return (
    <Container>
      <EditProfile>
        <EditImage onPress={handleClick}>
          <EditImage.Photo>{isEmpty(profileImage) ? <SmallPersonIcon /> : <Image style={{ width: 100, height: 100 }} source={{ uri: profileImage }} />}</EditImage.Photo>
          <EditImage.Icon>
            <SmallCameraIcon />
          </EditImage.Icon>
        </EditImage>
        <EditName>
          <EditName.Text>{nickname}</EditName.Text>
          <EditName.Icon>
            <SmallEditIcon />
          </EditName.Icon>
        </EditName>
      </EditProfile>
    </Container>
  );
};

export default SetProfile;
