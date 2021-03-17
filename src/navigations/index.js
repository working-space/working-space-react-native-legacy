import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import useStore from '~/hooks/useStore';
import LoginNavigator from '~/navigations/LoginNavigator';
import DrawerNavigator from '~/navigations/DrawerNavigator';

const Navigator = () => {
  const { AuthStore } = useStore();
  const { isLoggedIn } = AuthStore;

  return (
    <NavigationContainer>
      {isLoggedIn === false ? <DrawerNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default observer(Navigator);
