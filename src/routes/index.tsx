import React from 'react';
import RNBootSplash from 'react-native-bootsplash';

import {useAuth} from '../hooks/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const {signed, loading} = useAuth();

  if (loading) {
    RNBootSplash.show();
  } else {
    RNBootSplash.hide({fade: true});
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
