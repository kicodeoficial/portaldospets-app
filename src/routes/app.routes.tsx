import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {configValues} from '../config';
import {useAuth} from '../hooks/auth';

import CustomerRoutes from './customer.routes';
import ProfessionalRoutes from './professional.routes';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const {user} = useAuth();

  return user?.role === configValues.user.role.customer ? (
    <CustomerRoutes />
  ) : (
    <ProfessionalRoutes />
  );
};

export default AppRoutes;
