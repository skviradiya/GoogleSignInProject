import {profileIcon} from '@App/Assets/Icons';
import colors from '@App/Constant/colors';
import {gWindowWidth} from '@App/Constant/constants';
import {screens} from '@App/Constant/screens';
import {BASE_URL} from '@App/Constant/tempEnv';
import {NavigationProps} from '@App/types/navigation';
import {readUserInfo} from '@App/Utils/asyncActions';
import {SignInSuccessResponse} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {MasonryFlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PosterSectionView from './PosterSectionView';

interface IPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const [userInfo, setUserInfo] = React.useState<SignInSuccessResponse | null>(
    null,
  );
  const [nextPage, setNextPage] = React.useState<number>(2);
  const [photos, setPhotos] = React.useState<IPhoto[]>([]);

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

  async function getList(page = 1) {
    const response = await fetch(`${BASE_URL}/list?page=${page}`);
    const photosRes = await response.json();
    console.log('🚀 ~ getList ~ photos:', photosRes.length);
    return photosRes as IPhoto[];
  }
  const fetchPhotos = useCallback(async () => {
    try {
      const nextPhotos = await getList(nextPage);
      setPhotos([...photos, ...nextPhotos]);
      setNextPage(nextPage + 1);
    } catch (e) {}
  }, [nextPage, photos]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);
  const ListHeaderComponent = (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screens.ProfileScreen);
        }}
        activeOpacity={0.7}
        style={styles.welcomeCard}>
        <Image
          style={styles.imageStyle}
          source={
            userInfo?.data.user.photo
              ? {uri: userInfo?.data.user.photo}
              : profileIcon
          }
          defaultSource={profileIcon}
        />
        <View style={styles.cardTextContainerStyle}>
          <Text style={styles.welcomeText}>
            Welcome Back, {userInfo?.data.user.name || 'User'}!
          </Text>
          <Text style={styles.subText}>Hope you have a great day!</Text>
        </View>
      </TouchableOpacity>

      <PosterSectionView />
      <Text style={styles.sectionTitle}>Explore</Text>
    </>
  );
  const renderItem = ({item}: {item: IPhoto}) => {
    return (
      <FastImage
        key={item.id}
        source={{uri: item.download_url}}
        style={[
          styles.posterImage,
          {height: (item.height * (gWindowWidth / 3)) / item.width},
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* <FlatList
        // ListHeaderComponent={ListHeaderComponent}
        onEndReached={fetchPhotos}
        data={photos}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      /> */}
      <MasonryFlashList
        ListHeaderComponent={ListHeaderComponent}
        data={photos}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchPhotos}
        onEndReachedThreshold={0.2}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  welcomeCard: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: colors.black,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  subText: {
    fontSize: 14,
    color: colors.white,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.text,
  },
  posterImage: {
    flex: 1,
    width: gWindowWidth / 3,
    borderWidth: 2,
    borderColor: colors.white,
  },
  cardTextContainerStyle: {
    flex: 1,
    marginLeft: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default WelcomeScreen;
