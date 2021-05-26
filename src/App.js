import React, { useEffect } from 'react';
import SplashScreen from 'react-native-lottie-splash-screen';
import Navigator from '~/navigations';
import 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigator />;
};

export default App;
