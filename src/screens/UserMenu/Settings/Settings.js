import React from 'react';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, TextButton, Line } from './Settings.styles';

const Settings = ({ navigation }) => {
  return (
    <>
      <Header
        left={
          <Header.Button onPress={() => navigation.navigate('Main')}>
            <BackIcon />
          </Header.Button>
        }
      />
      <Container>
        <TextButton>
          <TextButton.Text>푸시 알림 설정</TextButton.Text>
        </TextButton>
        <TextButton>
          <TextButton.Text>위치 정보 사용 설정</TextButton.Text>
        </TextButton>
        <Line />
        <TextButton>
          <TextButton.Text>개인 정보 처리 방침</TextButton.Text>
        </TextButton>
        <TextButton>
          <TextButton.Text>이용 약관</TextButton.Text>
        </TextButton>
        <Line />
        <TextButton>
          <TextButton.Text>로그아웃</TextButton.Text>
        </TextButton>
        <TextButton>
          <TextButton.Text>회원탈퇴</TextButton.Text>
        </TextButton>
      </Container>
    </>
  );
};

export default Settings;
