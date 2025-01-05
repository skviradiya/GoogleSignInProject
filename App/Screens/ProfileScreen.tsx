import {profileIcon} from '@App/Assets/Icons';
import colors from '@App/Constant/colors';
import {screens} from '@App/Constant/screens';
import {NavigationProps} from '@App/types/navigation';
import {readUserInfo} from '@App/Utils/asyncActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  SignInSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [userInfo, setUserInfo] = React.useState<SignInSuccessResponse | null>(
    null,
  );

  const fetchData = async () => {
    try {
      const data = await readUserInfo();
      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.log('🚀 ~ fetchDat ~ error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onPressSignOut = () => {
    GoogleSignin.signOut();
    navigation.replace(screens.SingInScreen);
    AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />

      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={
            userInfo?.data.user.photo
              ? {uri: userInfo?.data.user.photo}
              : profileIcon
          }
        />
        <Text style={styles.profileName}>{userInfo?.data.user.name}</Text>
        <Text style={styles.profileEmail}>{userInfo?.data.user.email}</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={onPressSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    width: '85%',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 50,
  },
  signOutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
});
