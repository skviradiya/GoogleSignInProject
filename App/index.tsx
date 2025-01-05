import React from 'react';
import MainStack from './Navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
