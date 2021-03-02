import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'lodash';
import * as ImagePicker from 'react-native-image-picker';
import useStore from '~/hooks/useStore';
import { HeaderText, Container, ModalView, Footer, FooterBtn } from './Signup.styles';
import SetProfile from '~/components/SetProfile/SetProfile';
import SetTags from '~/components/SetTags/SetTags';

const Signup = () => {
  const { AuthStore } = useStore();
  const { login } = AuthStore;

  const [visibleForm, setVisibleForm] = useState('setProfile');
  const [userData, setUserData] = useState([]);
  const [nickname, setNickname] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [preferTags, setPreferTags] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataRaw = await AsyncStorage.getItem('UserData');
        const userDataParse = JSON.parse(userDataRaw);
        setUserData(userDataParse);
        setProfileImage(userDataParse.profileImage);
        setNickname(userDataParse.nickname);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const handlePrevBtn = () => {
    console.log('prev');
    visibleForm === 'setTags' && setVisibleForm('setProfile');
  };

  const handleNextBtn = () => {
    console.log('next');
    visibleForm === 'setProfile' && setVisibleForm('setTags');
    if (visibleForm === 'setTags') {
      console.log('end');
      login(userData.token);
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
    <Container>
      <HeaderText>
        {userData.nickname}님,{'\n'}반가워요!{'\n'}프로필을 설정해볼까요?
      </HeaderText>
      <ModalView>
        {visibleForm === 'setProfile' && <SetProfile nickname={nickname} profileImage={profileImage} onSetProfileImage={handleSetProfileImage} />}
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
  );
};

export default observer(Signup);
