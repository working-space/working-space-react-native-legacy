import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { css } from '@emotion/native';
import MainNavigator from './MainNavigator';
import DrawerMenu from '~/screens/DrawerMenu/DrawerMenu';

const Drawer = createDrawerNavigator();

// Note: 현재 DrawerNavigator는 사용하고 있지 않음
// 혹시나 다시 사용하게 될 경우 이 Note를 삭제할 것
// 장기간 사용하지 않게 될 경우, 이 DrawerNavigator.js를 삭제할 것
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerMenu}
      drawerStyle={css`
        width: 100%;
      `}>
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
