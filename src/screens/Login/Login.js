import React from 'react';
import { Image } from 'react-native';
import { login, getProfile as getKakaoProfile, KakaoOAuthToken, KakaoProfile, logout, unlink } from '@react-native-seoul/kakao-login';
import { observer } from 'mobx-react-lite';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import DummyLoginIllustURL from '~/assets/images/dummy_illust.jpg';
import GoogleButtonIcon from '~/assets/icons/google_button.svg';
import { HeaderText, Container, Footer, LoginBtn } from './Login.styles';

const Login = ({ navigation }) => {
  const onLogin = async () => {
    try {
      const token = await login();
      const profile = await getKakaoProfile();
      await navigation.navigate('Signup', { token: token.accessToken, name: profile.nickname, profileImageUrl: profile.profileImageUrl });
    } catch (error) {
      console.error(error);
    }
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
