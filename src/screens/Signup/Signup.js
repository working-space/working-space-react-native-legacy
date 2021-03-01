import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'lodash';
import useStore from '~/hooks/useStore';
import { HeaderText, Container, ModalView, Footer, FooterBtn } from './Signup.styles';
import SetProfile from '~/components/SetProfile/SetProfile';
import SetTags from '~/components/SetTags/SetTags';

const Signup = () => {
  const { AuthStore } = useStore();
  const { login } = AuthStore;

  const [visibleForm, setVisibleForm] = useState('setProfile');
  const [userData, setUserData] = useState([]);
  // const [nickname, setNickname] = useState('');
  // const [profileImage, setProfileImage] = useState('');
  const [preferTags, setPreferTags] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataRaw = await AsyncStorage.getItem('UserData');
        setUserData(JSON.parse(userDataRaw));
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [userData]);

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
        {visibleForm === 'setProfile' && <SetProfile userData={userData} />}
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
