import {
  logoutIcon,
  privacyIcon,
  profileIcon,
  settingsIcon,
  termsIcon,
  welcomeIcon,
} from '@App/Assets/Icons';
import ComingSoonModal from '@App/Components/ComingSoonModal';
import LogoutConfirmationModal from '@App/Components/LogoutConfirmationModal';
import colors from '@App/Constant/colors';
import {screens} from '@App/Constant/screens';
import {readUserInfo} from '@App/Utils/asyncActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  SignInSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {StackActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CustomDrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const [userInfo, setUserInfo] = useState<SignInSuccessResponse | null>(null);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isComingSoonModalVisible, setComingSoonModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const data = await readUserInfo();
      if (data) {
        setUserInfo(data);
      }
    } catch (error) {
      console.log('🚀 ~ fetchData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = async () => {
    setLogoutModalVisible(false);
    await GoogleSignin.signOut();
    await AsyncStorage.clear();
    navigation.dispatch(StackActions.replace(screens.SingInScreen));
  };

  const menuItems = [
    {
      label: 'Welcome Screen',
      icon: welcomeIcon,
      onPress: () => {
        navigation.openDrawer();
        navigation.navigate(screens.WelcomeScreen);
      },
    },
    {
      label: 'Privacy Policy',
      icon: privacyIcon,
      onPress: () => setComingSoonModalVisible(true),
    },
    {
      label: 'Terms & Conditions',
      icon: termsIcon,
      onPress: () => setComingSoonModalVisible(true),
    },
    {
      label: 'Settings',
      icon: settingsIcon,
      onPress: () => setComingSoonModalVisible(true),
    },
    {
      label: 'Logout',
      icon: logoutIcon,
      onPress: () => setLogoutModalVisible(true),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.row}
        onPress={() => navigation.navigate(screens.ProfileScreen)}>
        <Image
          style={styles.imageStyle}
          source={
            userInfo?.data.user.photo
              ? {uri: userInfo?.data.user.photo}
              : profileIcon
          }
          defaultSource={profileIcon}
        />
        <View style={styles.profileContainer}>
          <Text style={styles.userName}>{userInfo?.data.user.name}</Text>
          <Text style={styles.emailText}>{userInfo?.data.user.email}</Text>
          <Text style={styles.viewProfile}>View Profile</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuButton}
            onPress={item.onPress}>
            <Image source={item.icon} style={styles.iconStyle} />
            <Text style={styles.menuButtonText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.versionText}>Version 1.0</Text>
      <LogoutConfirmationModal
        isVisible={isLogoutModalVisible}
        onConfirm={handleSignOut}
        onCancel={() => setLogoutModalVisible(false)}
      />
      <ComingSoonModal
        visible={isComingSoonModalVisible}
        onClose={() => setComingSoonModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: colors.background,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileContainer: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
  emailText: {
    color: colors.black,
    fontSize: 14,
  },
  viewProfile: {
    color: colors.dark,
    fontSize: 12,
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuButtonText: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 20,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  versionText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: 12,
    marginVertical: 50,
  },
});
