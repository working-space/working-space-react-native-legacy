import React, { Fragment, useState, useCallback, useRef } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from '~/components/Header/Header';
import InputText from '~/components/InputText/InputText';
import { Container, FavoriteTags, Tag, Menu, Line } from './ProfileMenu.styles';
import TAG from '~/constants/tag';
import BackIcon from '~/assets/icons/icon_back.svg';
import SettingIcon from '~/assets/icons/icon_setting.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import CommentMenuIcon from '~/assets/icons/icon_comment_menu.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import SetProfile from '../../components/SetProfile/SetProfile';

const favoriteTags = [TAG.concent, TAG.twentyFour, TAG.toilet, TAG.dessert];

const ProfileMenu = ({ navigation }) => {
  const [visibleInput, setVisibleInput] = useState(false);
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
    setVisibleInput(true);
  };

  const handleSetNickname = (text) => {
    setNickname(text);
    setVisibleInput(false);
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
            <FavoriteTags.Menu>수정하기</FavoriteTags.Menu>
          </FavoriteTags.Header>
          <FavoriteTags.List empty={favoriteTags.length <= 0}>
            {favoriteTags &&
              favoriteTags.map((tag, index) => (
                <Fragment key={tag.name}>
                  <Tag>
                    <Tag.Icon>{tag.icon}</Tag.Icon>
                    <Tag.Name>{tag.name}</Tag.Name>
                  </Tag>
                  {favoriteTags.length - 1 !== index && (
                    <Tag.SeparatorContainer>
                      <Tag.Separator />
                    </Tag.SeparatorContainer>
                  )}
                </Fragment>
              ))}
            {favoriteTags.length <= 0 && <FavoriteTags.EmptyText>등록된 태그가 없습니다.</FavoriteTags.EmptyText>}
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
        isVisible={visibleInput}
        onBackButtonPress={() => setVisibleInput(false)}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onModalShow={() => inputRef.current.focus()}>
        <InputText usage="nickname" defaultText={nickname} onSetInputText={handleSetNickname} inputRef={inputRef} />
      </Modal>
    </>
  );
};

export default ProfileMenu;
