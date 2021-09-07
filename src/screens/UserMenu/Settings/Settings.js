import React from 'react';
import { Linking } from 'react-native';
import Header from '~/components/Header/Header';
import BackIcon from '~/assets/icons/icon_back.svg';
import { Container, TextButton, Line } from './Settings.styles';
import { privacyPolicyText, termsText } from '~/constants/terms';

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
        <TextButton onPress={() => navigation.navigate('Terms', { content: termsText })}>
          <TextButton.Text>이용 약관</TextButton.Text>
        </TextButton>
        <TextButton onPress={() => navigation.navigate('Terms', { content: privacyPolicyText })}>
          <TextButton.Text>개인 정보 처리 방침</TextButton.Text>
        </TextButton>
        <Line />
        <TextButton>
          <TextButton.Text>도움이 필요하신가요?</TextButton.Text>
          <TextButton.Link onPress={() => Linking.openURL('https://open.kakao.com/o/gc0HfOid')}>
            <TextButton.LinkText>채팅으로 문의하기</TextButton.LinkText>
          </TextButton.Link>
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
