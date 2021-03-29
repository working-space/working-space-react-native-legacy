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

const Signup = ({ route }) => {
  const { token, name, profileImageUrl } = route.params;
  const { AuthStore } = useStore();
  const { login } = AuthStore;

  const [visibleForm, setVisibleForm] = useState('setProfile');
  const [visibleInput, setVisibleInput] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [preferTags, setPreferTags] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setProfileImage(profileImageUrl);
        setNickname(name);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [name, profileImageUrl]);

  const handlePrevBtn = () => {
    visibleForm === 'setTags' && setVisibleForm('setProfile');
  };

  const handleNextBtn = () => {
    visibleForm === 'setProfile' && setVisibleForm('setTags');
    if (visibleForm === 'setTags') {
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

  const handleSetNicknameModal = useCallback(async () => {
    await setVisibleInput(true);
  }, []);

  const handleSetNickname = useCallback(async (text) => {
    await setNickname(text);
    await setVisibleInput(false);
  }, []);

  const handleToggleTag = useCallback((tag) => {
    setPreferTags((prevSelectedTagIds) => {
      const ids = [...prevSelectedTagIds];
      const index = ids.findIndex((id) => tag.id === id);
      if (index > -1) {
        ids.splice(index, 1);
      } else {
        ids.push(tag.id);
      }
      return ids;
    });
  }, []);

  return (
    <>
      <Container>
        <HeaderText>
          {nickname}님,{'\n'}반가워요!{'\n'}프로필을 설정해볼까요?
        </HeaderText>
        <ModalView>
          {visibleForm === 'setProfile' && <SetProfile nickname={nickname} profileImage={profileImage} onSetProfileImage={handleSetProfileImage} onSetNicknameModal={handleSetNicknameModal} />}
          {visibleForm === 'setTags' && <SetTags preferTags={preferTags} onToggleTag={handleToggleTag} />}
        </ModalView>
        <Footer>
          {visibleForm === 'setTags' ? (
            <FooterBtn onPress={handlePrevBtn}>
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
          <FooterBtn style={{ backgroundColor: visibleForm === 'setProfile' ? '#ffbb44' : isEmpty(preferTags) ? '#fff' : '#ffbb44' }} onPress={handleNextBtn}>
            <FooterBtn.Next style={{ color: visibleForm === 'setProfile' ? '#fff' : isEmpty(preferTags) ? '#222' : '#fff' }}>
              {visibleForm === 'setProfile' ? '다음' : isEmpty(preferTags) ? '건너뛰기' : '완료'}
            </FooterBtn.Next>
          </FooterBtn>
        </Footer>
      </Container>
      <Modal
        style={{ width: '100%', margin: 0 }}
        isVisible={visibleInput}
        onBackButtonPress={() => setVisibleInput(false)}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onModalShow={() => inputRef.current.focus()}>
        <InputText defaultText={nickname} onSetNickname={handleSetNickname} inputRef={inputRef} />
      </Modal>
    </>
  );
};

export default observer(Signup);
