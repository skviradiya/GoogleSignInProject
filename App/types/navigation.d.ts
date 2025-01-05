import { screens } from '@App/Constant/screens';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackNavigationParams={
[screens.SplashScreen]:undefined,
[screens.SingInScreen]:undefined,
[screens.DrawerStack]:undefined,
[screens.WelcomeScreen]:undefined,
[screens.ProfileScreen]:undefined,
}

export type NavigationProps=NativeStackNavigationProp<RootStackNavigationParams>
