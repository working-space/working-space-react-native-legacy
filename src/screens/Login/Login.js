import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import Button from '~/components/Button/Button';

const Login = ({ navigation }) => {
  const { AuthStore } = useStore();
  const { login } = AuthStore;

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button label="로그인" onPress={() => login('puterism@naver.com')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(Login);
