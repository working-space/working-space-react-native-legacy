import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { css } from '@emotion/native';
import MainNavigator from './MainNavigator';
import DrawerMenu from '~/screens/DrawerMenu/DrawerMenu';

const Drawer = createDrawerNavigator();

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
