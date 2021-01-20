import React from 'react';
import { Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Button from '~/components/Button/Button';
import { Container } from './Main.styles';

const Main = ({ navigation }) => {
  const { AuthStore } = useStore();
  const { logout } = AuthStore;

  return (
    <Container>
      <Text>메인</Text>
      <Button label="지도" onPress={() => navigation.navigate('Map')} />
      <Button label="로그아웃" onPress={() => logout()} />
    </Container>
  );
};

export default observer(Main);
