import React from 'react';
import { Image } from 'react-native';
import { login, getProfile as getKakaoProfile, KakaoOAuthToken, KakaoProfile, logout, unlink } from '@react-native-seoul/kakao-login';
import { observer } from 'mobx-react-lite';
import AutoFitImage from '~/components/AutoFitImage/AutoFitImage';
import LoginIllustURL from '~/assets/images/login_illust.jpg';
import GoogleButtonIcon from '~/assets/icons/google_button.svg';
import { HeaderText, Container, Footer, LoginButton } from './Login.styles';

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
      <AutoFitImage source={LoginIllustURL} />
      <Footer>
        <LoginButton onPress={onLogin}>
          <LoginButton.Icon>
            <Image style={{ width: '100%', height: '100%' }} source={require('~/assets/icons/kakao_button.png')} />
          </LoginButton.Icon>
          <LoginButton.Text>카카오 로그인</LoginButton.Text>
        </LoginButton>
        <LoginButton>
          <LoginButton.Icon>
            <GoogleButtonIcon />
          </LoginButton.Icon>
          <LoginButton.Text>구글 로그인</LoginButton.Text>
        </LoginButton>
      </Footer>
    </Container>
  );
};

export default observer(Login);
