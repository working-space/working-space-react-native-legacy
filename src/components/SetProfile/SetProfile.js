import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { isEmpty } from 'lodash';
import { Container, EditProfile, EditImage, EditName } from './SetProfile.styles';
import SmallCameraIcon from '~/assets/icons/icon_small_camera.svg';
import SmallPersonIcon from '~/assets/icons/icon_small_person.svg';
import SmallEditIcon from '~/assets/icons/icon_small_edit.svg';

const SetProfile = ({ nickname, profileImage, onSetProfileImage, onSetNicknameModal }) => {
  const handleClickImage = useCallback(() => {
    onSetProfileImage?.();
  }, [onSetProfileImage]);

  const handleChangeNicknameModal = useCallback(() => {
    onSetNicknameModal?.();
  }, [onSetNicknameModal]);

  return (
    <Container>
      <EditProfile>
        <EditImage onPress={handleClickImage}>
          <EditImage.Photo>{isEmpty(profileImage) ? <SmallPersonIcon /> : <Image style={{ width: 100, height: 100 }} source={{ uri: profileImage }} />}</EditImage.Photo>
          <EditImage.Icon>
            <SmallCameraIcon />
          </EditImage.Icon>
        </EditImage>
        <EditName onPress={handleChangeNicknameModal}>
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
