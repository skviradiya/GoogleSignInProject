import colors from '@App/Constant/colors';
import {gWindowWidth} from '@App/Constant/constants';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export default function PosterSectionView() {
  const listRef = React.useRef<FlatList>(null);
  const [listIndex, setListIndex] = React.useState(0);
  const posters = [
    {
      id: '1',
      image: 'https://picsum.photos/seed/lion/400/200',
    },
    {
      id: '2',
      image: 'https://picsum.photos/seed/nature/400/200',
    },
    {
      id: '3',
      image: 'https://picsum.photos/seed/cricket/400/200',
    },
  ];
  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setListIndex(prevIndex => {
        if (
          prevIndex + direction >= posters.length ||
          prevIndex + direction < 0
        ) {
          direction *= -1;
        }
        return prevIndex + direction;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [posters.length]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToIndex({index: listIndex, animated: true});
    }
  }, [listIndex]);
  return (
    <>
      <Text style={styles.sectionTitle}>Featured Posters</Text>
      <FlatList
        ref={listRef}
        data={posters}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return (
            <Image
              key={item.id}
              source={{uri: item.image}}
              style={styles.posterImage}
            />
          );
        }}
      />
      <View style={styles.indicatorContainer}>
        {posters.map((_, i) => {
          const isSelected = i === listIndex;
          const opacity = isSelected ? 1 : 0.5;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  opacity: opacity,
                },
              ]}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.text,
  },
  posterImage: {
    width: gWindowWidth - 20,
    height: gWindowWidth / 2,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 5,
  },
});
