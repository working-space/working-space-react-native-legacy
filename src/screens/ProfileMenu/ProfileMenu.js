import React, { Fragment, useState, useCallback, useRef } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { css } from '@emotion/native';
import { isEmpty } from 'lodash';
import Header from '~/components/Header/Header';
import InputText from '~/components/InputText/InputText';
import { Container, FavoriteTags, Tag, Menu, Line, ModalEvaluation } from './ProfileMenu.styles';
import TAG from '~/constants/tag';
import BackIcon from '~/assets/icons/icon_back.svg';
import SettingIcon from '~/assets/icons/icon_setting.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import CommentMenuIcon from '~/assets/icons/icon_comment_menu.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import CloseIcon from '~/assets/icons/icon_close.svg';
import SetProfile from '~/components/SetProfile/SetProfile';
import SetTags from '~/components/SetTags/SetTags';
import useSelectedTags from '~/hooks/useSelectedTags';

const ProfileMenu = ({ navigation }) => {
  const [visibleTagsModal, setVisibleTagsModal] = useState(false);
  const [preferredTags, setpreferredTags] = useState([]);
  const { selectedTags, setSelectedTags, toggleTag } = useSelectedTags([]);
  const [visibleInputModal, setVisibleInputModal] = useState(false);
  const [nickname, setNickname] = useState('김작업');
  const [profileImage, setProfileImage] = useState(null);
  const inputRef = useRef(null);

  const handleSetProfileImage = useCallback(async () => {
    await ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setProfileImage(response.uri);
        }
      },
    );
  }, []);

  const handleSetNicknameModal = () => {
    setVisibleInputModal(true);
  };

  const handleSetNickname = (text) => {
    setNickname(text);
    setVisibleInputModal(false);
  };

  const handleSubmitBtn = () => {
    setVisibleTagsModal(false);
    setpreferredTags([...selectedTags]);
  };

  const handleCloseBtn = () => {
    setVisibleTagsModal(false);
    setSelectedTags([...preferredTags]);
  };

  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.goBack()}>
            <BackIcon style={{ fill: '#222' }} />
          </Header.Button>
        }
      />
      <Container>
        <SetProfile nickname={nickname} profileImage={profileImage} showBadge={true} onSetProfileImage={handleSetProfileImage} onSetNicknameModal={handleSetNicknameModal} />
        <FavoriteTags>
          <FavoriteTags.Header>
            <FavoriteTags.Title>나의 선호 태그</FavoriteTags.Title>
            <FavoriteTags.MenuButton onPress={() => setVisibleTagsModal(true)}>
              <FavoriteTags.Menu>수정하기</FavoriteTags.Menu>
            </FavoriteTags.MenuButton>
          </FavoriteTags.Header>
          <FavoriteTags.List empty={selectedTags.length <= 0}>
            {selectedTags &&
              selectedTags.map((tag, index) => (
                <Fragment key={TAG[tag].name}>
                  <Tag>
                    <Tag.Icon>{TAG[tag].icon}</Tag.Icon>
                    <Tag.Name>{TAG[tag].name}</Tag.Name>
                  </Tag>
                  {selectedTags.length - 1 !== index && (
                    <Tag.SeparatorContainer>
                      <Tag.Separator />
                    </Tag.SeparatorContainer>
                  )}
                </Fragment>
              ))}
            {selectedTags.length <= 0 && <FavoriteTags.EmptyText>등록된 태그가 없습니다.</FavoriteTags.EmptyText>}
          </FavoriteTags.List>
        </FavoriteTags>
        <Menu>
          <Menu.Item onPress={() => navigation.navigate('Favorites')}>
            <Menu.Icon>
              <FavoriteFillIcon />
            </Menu.Icon>
            <Menu.Text>좋아요 누른 작업공간</Menu.Text>
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('Comments')}>
            <Menu.Icon>
              <CommentMenuIcon />
            </Menu.Icon>
            <Menu.Text>작성한 리뷰</Menu.Text>
          </Menu.Item>
          <Menu.Item onPress={() => navigation.navigate('Bookmarks')}>
            <Menu.Icon>
              <BookmarkIcon />
            </Menu.Icon>
            <Menu.Text>즐겨찾기</Menu.Text>
          </Menu.Item>
          <Line />
          <Menu.Item onPress={() => navigation.navigate('Settings')}>
            <Menu.Icon>
              <SettingIcon />
            </Menu.Icon>
            <Menu.Text>앱 설정</Menu.Text>
          </Menu.Item>
        </Menu>
      </Container>
      <Modal
        style={{ width: '100%', margin: 0 }}
        backdropOpacity={0.3}
        isVisible={visibleInputModal}
        onBackButtonPress={() => setVisibleInputModal(false)}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onModalShow={() => inputRef.current.focus()}>
        <InputText usage="nickname" defaultText={nickname} onSetInputText={handleSetNickname} inputRef={inputRef} />
      </Modal>
      <Modal style={{ width: '100%', margin: 0 }} isVisible={visibleTagsModal} onBackButtonPress={handleCloseBtn} hideModalContentWhileAnimating={true} useNativeDriver={true}>
        <ModalEvaluation>
          <ModalEvaluation.Header>
            <ModalEvaluation.Top>
              <ModalEvaluation.CloseButton onPress={handleCloseBtn}>
                <CloseIcon style={{ fill: '#222' }} />
              </ModalEvaluation.CloseButton>
            </ModalEvaluation.Top>
            <ModalEvaluation.Bottom>
              <ModalEvaluation.Title>작업공간으로{'\n'}선호하는 태그를 선택해주세요!</ModalEvaluation.Title>
            </ModalEvaluation.Bottom>
          </ModalEvaluation.Header>
          <SetTags preferTags={selectedTags} onToggleTag={toggleTag} />
          <ModalEvaluation.SubmitButton
            onPress={handleSubmitBtn}
            style={css`
              background-color: ${isEmpty(preferredTags) && isEmpty(selectedTags) ? '#cccccc' : '#ffbb44'};
            `}>
            <ModalEvaluation.Text>
              {isEmpty(preferredTags) && isEmpty(selectedTags) ? '태그가 선택되지 않았어요.' : `태그 ${selectedTags ? selectedTags.length : preferredTags.length}개 선택! 등록하기`}
            </ModalEvaluation.Text>
          </ModalEvaluation.SubmitButton>
        </ModalEvaluation>
      </Modal>
    </>
  );
};

export default ProfileMenu;
