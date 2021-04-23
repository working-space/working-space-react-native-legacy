import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import LoginNavigator from '~/navigations/LoginNavigator';
import MainNavigator from '~/navigations/MainNavigator';

const Navigator = () => {
  const { AuthStore } = useStore();
  const { isLoggedIn } = AuthStore;

  return <NavigationContainer>{isLoggedIn ? <MainNavigator /> : <LoginNavigator />}</NavigationContainer>;
};

export default observer(Navigator);
