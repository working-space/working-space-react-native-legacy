import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '~/screens/Main/Main';
import Map from '~/screens/Map/Map';
import Search from '~/screens/Search/Search';
import Favorites from '~/screens/UserMenu/Favorites/Favorites';
import Comments from '~/screens/UserMenu/Comments/Comments';
import Bookmarks from '~/screens/UserMenu/Bookmarks/Bookmarks';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
          animationEnabled: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Bookmarks"
        component={Bookmarks}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
