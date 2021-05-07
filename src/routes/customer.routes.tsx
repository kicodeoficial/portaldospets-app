import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {CustomerHome, CustomerProfile} from '../screens';
import theme from '../styles/themes/light';

const Stack = createStackNavigator();

const StackScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={CustomerProfile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const CustomerRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            return <Ionicons name={'home-outline'} size={size} color={color} />;
          } else if (route.name === 'Notifications') {
            return (
              <Ionicons
                name={'ios-notifications-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Pets') {
            return (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: theme.colors.backgroundRedPrimary,
                  padding: 12,
                  bottom: 10,
                  borderRadius: 50,
                }}>
                <MaterialIcons
                  name={'pets'}
                  size={size}
                  color={theme.colors.textWhitePrimary}
                />
              </View>
            );
          } else if (route.name === 'Profile') {
            return <FontAwesome name={'user-o'} size={size} color={color} />;
          } else if (route.name === 'Menu') {
            return <Feather name={'menu'} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        keyboardHidesTabBar: true,
        labelPosition: 'below-icon',
        activeTintColor: theme.colors.textRedPrimary,
        inactiveTintColor: theme.colors.textSecondary,
        style: {
          height: 50,
          elevation: 5,
          shadowRadius: 5,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.1,
          shadowColor: theme.colors.textTertiary,
          paddingHorizontal: 30,
        },
      }}>
      <Tab.Screen name="Home" component={CustomerHome} />
      <Tab.Screen
        name="Notifications"
        component={CustomerHome}
        options={{
          tabBarBadge: undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.textRedPrimary,
            fontSize: theme.fontSize.legend,
          },
          tabBarLabel: '',
        }}
      />
      <Tab.Screen name="Pets" component={CustomerProfile} />
      <Tab.Screen name="Profile" component={CustomerProfile} />
      <Tab.Screen name="Menu" component={StackScreen} />
    </Tab.Navigator>
  );
};

export default CustomerRoutes;
