import React, { useState, useEffect, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'lodash';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import useStore from '~/hooks/useStore';
import { HeaderText, Container, ModalView, Footer, FooterBtn } from './Signup.styles';
import SetProfile from '~/components/SetProfile/SetProfile';
import SetTags from '~/components/SetTags/SetTags';
import InputText from '~/components/InputText/InputText';
import useSelectedTags from '../../hooks/useSelectedTags';

const Signup = ({ route }) => {
  const { token, name, profileImageUrl } = route.params;
  const { AuthStore } = useStore();
  const { login } = AuthStore;

  const [visibleForm, setVisibleForm] = useState('setProfile');
  const [visibleInput, setVisibleInput] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { selectedTags, toggleTag } = useSelectedTags([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // TODO: API 연동
        setProfileImage(profileImageUrl);
        setNickname(name);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [name, profileImageUrl]);

  const handlePrevButtonClick = () => {
    switch (visibleForm) {
      case 'setTags':
        setVisibleForm('setProfile');
        break;
    }
  };

  const handleNextButtonClick = () => {
    switch (visibleForm) {
      case 'setProfile':
        setVisibleForm('setTags');
        break;
      case 'setTags':
        login(token);
    }
  };

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
      <Container>
        <HeaderText>
          {nickname}님,{'\n'}반가워요!{'\n'}프로필을 설정해볼까요?
        </HeaderText>
        <ModalView>
          {visibleForm === 'setProfile' && <SetProfile nickname={nickname} profileImage={profileImage} onSetProfileImage={handleSetProfileImage} onSetNicknameModal={handleSetNicknameModal} />}
          {visibleForm === 'setTags' && <SetTags preferTags={selectedTags} onToggleTag={toggleTag} />}
        </ModalView>
        <Footer>
          {visibleForm === 'setTags' ? (
            <FooterBtn onPress={handlePrevButtonClick}>
              <FooterBtn.Prev>이전</FooterBtn.Prev>
            </FooterBtn>
          ) : (
            <FooterBtn style={{ paddingLeft: 0 }}>
              <FooterBtn.Text>
                개인 정보 수집에 동의하신다면 아래의 ‘다음'{'\n'}
                버튼을 눌러주세요.
              </FooterBtn.Text>
            </FooterBtn>
          )}
          <FooterBtn style={{ backgroundColor: visibleForm === 'setProfile' ? '#ffbb44' : isEmpty(selectedTags) ? '#fff' : '#ffbb44' }} onPress={handleNextButtonClick}>
            <FooterBtn.Next style={{ color: visibleForm === 'setProfile' ? '#fff' : isEmpty(selectedTags) ? '#222' : '#fff' }}>
              {visibleForm === 'setProfile' ? '다음' : isEmpty(selectedTags) ? '건너뛰기' : '완료'}
            </FooterBtn.Next>
          </FooterBtn>
        </Footer>
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

export default observer(Signup);
