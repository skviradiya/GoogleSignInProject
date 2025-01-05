import {screens} from '@App/Constant/screens';
import SingInScreen from '@App/Screens/SingInScreen';
import SplashScreen from '@App/Screens/SplashScreen';
import {RootStackNavigationParams} from '@App/types/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import ProfileScreen from '@App/Screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import DrawerStack from './DrawerStack';
const Stack = createNativeStackNavigator<RootStackNavigationParams>();
export default function MainStack() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '488473427056-nd8rqudtpnh7bon72a73vidrevcujcu3.apps.googleusercontent.com',
      iosClientId:
        '488473427056-b3k1frm0ikjdgd94o1hat9bbn2hfmb75.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={screens.SplashScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={screens.SingInScreen} component={SingInScreen} />
      <Stack.Screen name={screens.DrawerStack} component={DrawerStack} />
      <Stack.Screen
        name={screens.ProfileScreen}
        component={ProfileScreen}
        options={{headerTitle: 'Profile', headerShown: true,headerBackTitle:'Back'}}
      />
    </Stack.Navigator>
  );
}
