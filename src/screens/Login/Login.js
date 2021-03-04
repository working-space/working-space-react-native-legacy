import React from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { observer } from 'mobx-react-lite';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import DummyLoginIllustURL from '~/assets/images/dummy_illust.jpg';
import GoogleButtonIcon from '~/assets/icons/google_button.svg';
import { HeaderText, Container, Footer, LoginBtn } from './Login.styles';

const Login = ({ navigation }) => {
  const userData = {
    token: 'bbongwa@naver.com',
    nickname: '지원',
    profileImage: null,
  };

  const saveToken = async (data) => {
    try {
      await AsyncStorage.setItem('UserData', JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  const onLogin = () => {
    saveToken(userData);
    navigation.navigate('Signup');
  };

  return (
    <Container>
      <HeaderText>원하는 작업 공간을{'\n'}직접 찾아보세요!</HeaderText>
      <AutoFitImage source={DummyLoginIllustURL} />
      <Footer>
        <LoginBtn onPress={onLogin}>
          <LoginBtn.Icon>
            <Image style={{ width: '100%', height: '100%' }} source={require('~/assets/icons/kakao_button.png')} />
          </LoginBtn.Icon>
          <LoginBtn.Text>카카오 로그인</LoginBtn.Text>
        </LoginBtn>
        <LoginBtn>
          <LoginBtn.Icon>
            <GoogleButtonIcon />
          </LoginBtn.Icon>
          <LoginBtn.Text>구글 로그인</LoginBtn.Text>
        </LoginBtn>
      </Footer>
    </Container>
  );
};

export default observer(Login);
