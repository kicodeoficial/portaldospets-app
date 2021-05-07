// É obrigatório essa linha ser no início antes de tudo
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'styled-components';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {AuthProvider} from './hooks/auth';
import Routes from './routes';

import light from './styles/themes/light';

const App: React.FC = () => {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    changeNavigationBarColor(theme.colors.backgroundPrimary, true, true);
  });

  return (
    <NavigationContainer>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.backgroundPrimary}
          />
          <Routes />
          <FlashMessage statusBarHeight={getStatusBarHeight(true)} />
        </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
