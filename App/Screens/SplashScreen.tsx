import {GoogleLottie} from '@App/Assets/Lotties';
import colors from '@App/Constant/colors';
import {screens} from '@App/Constant/screens';
import {NavigationProps} from '@App/types/navigation';
import {readUserInfo} from '@App/Utils/asyncActions';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProps>();
  const navigationHandling = async () => {
    const data = await readUserInfo();
    if (data) {
      navigation.replace(screens.DrawerStack);
    } else {
      navigation.replace(screens.SingInScreen);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <LottieView
        source={GoogleLottie}
        autoPlay
        style={styles.lottieStyle}
        loop={false}
        onAnimationFinish={navigationHandling}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  lottieStyle: {
    width: '50%',
    height: '50%',
    backgroundColor: colors.background,
  },
});
