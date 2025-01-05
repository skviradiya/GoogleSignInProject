import {screens} from '@App/Constant/screens';
import WelcomeScreen from '@App/Screens/Welcome/WelcomeScreen';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from './CustomDrawerContent';
const Drawer = createDrawerNavigator();
export default function DrawerStack() {
  const renderDrawerContent = (props: DrawerContentComponentProps) => (
    <CustomDrawerContent {...props} />
  );
  return (
    <Drawer.Navigator
      drawerContent={renderDrawerContent}
      screenOptions={{
        drawerStyle: {
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
        },
      }}>
      <Drawer.Screen
        name={screens.WelcomeScreen}
        component={WelcomeScreen}
        options={{headerTitle: 'Welcome'}}
      />
    </Drawer.Navigator>
  );
}
