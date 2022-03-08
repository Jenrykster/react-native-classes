import React, { useEffect, useRef } from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsOverviewScreen from '../screens/shop/ProductOverviewScreen';
import {
  AuthNavigator,
  ProductsNavigator,
  ShopNavigator,
} from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
