import {GoogleSignInLottie} from '@App/Assets/Lotties';
import colors from '@App/Constant/colors';
import {screens} from '@App/Constant/screens';
import {NavigationProps} from '@App/types/navigation';
import {saveUserInfo} from '@App/Utils/asyncActions';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

export default function SignInScreen({}) {
  const navigation = useNavigation<NavigationProps>();
  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.type === 'success') {
        await saveUserInfo(userInfo);
        navigation.replace(screens.DrawerStack);
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={{flex: 1}}>
        <LottieView
          source={GoogleSignInLottie}
          autoPlay
          loop={false}
          style={{width: '200%', height: '100%', left: '-50%'}}
        />
      </View>
      <View style={styles.cardStyle}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to access your account</Text>
        <GoogleSigninButton
          style={{width: 230, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleSignIn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardStyle: {
    flex: 0.5,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    alignSelf: 'flex-end',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
});
