import React from 'react';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {
  Welcome,
  SignIn,
  SignUpUserType,
  ResetPassword,
  SignUpCustomer,
} from '../screens';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#fff'},
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
      initialRouteName="Welcome">
      <Auth.Screen name="Welcome" component={Welcome} />
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="ResetPassword" component={ResetPassword} />
      <Auth.Screen name="SignUpUserType" component={SignUpUserType} />
      <Auth.Screen name="SignUpCustomer" component={SignUpCustomer} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
