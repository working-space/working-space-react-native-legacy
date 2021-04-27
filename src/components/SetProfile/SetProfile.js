import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { isEmpty } from 'lodash';
import { Container, EditProfile, EditImage, EditName, BadgeName } from './SetProfile.styles';
import SmallCameraIcon from '~/assets/icons/icon_small_camera.svg';
import PersonIcon from '~/assets/icons/icon_person.svg';
import SmallEditIcon from '~/assets/icons/icon_small_edit.svg';

const SetProfile = ({ nickname, profileImage, showBadge, onSetProfileImage, onSetNicknameModal }) => {
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
          <EditImage.Photo>{isEmpty(profileImage) ? <PersonIcon /> : <Image style={{ width: 100, height: 100 }} source={{ uri: profileImage }} />}</EditImage.Photo>
          <EditImage.Icon>
            <SmallCameraIcon />
          </EditImage.Icon>
        </EditImage>
        {showBadge && <BadgeName>평범한 작업자</BadgeName>}
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

SetProfile.defaultProps = {
  showBadge: false,
};

export default SetProfile;
