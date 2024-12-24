import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, ActivityIndicator, Dimensions, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ShowCard from '../ChildComponent/ShowCard';
import CustomFooter from '../ChildComponent/Footer';

const { width } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const fetchShows = async () => {
    try {
      const res = await axios.get('https://api.tvmaze.com/search/shows?q=all');
      setShows(res.data);
      setLoading(false);
      setBannerData(res.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (bannerData.length > 0 && flatListRef.current) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % bannerData.length;
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
          }
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [bannerData]);

  const renderBannerItem = ({ item }) => {
    const imageUrl = item.show.image?.original;
    const fallbackImage = 'https://via.placeholder.com/500x250/000000/FFFFFF/?text=No+Image+Available';

    return (
      <View style={styles.bannerItem}>
        <Image
          source={{ uri: imageUrl || fallbackImage }}
          style={styles.bannerImage}
        />
      </View>
    );
  };

  const renderShowSlider = (categoryName, shows) => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderTitle}>{categoryName}</Text>
      <FlatList
        data={shows}
        renderItem={({ item }) => <ShowCard show={item} navigation={navigation} />}
        keyExtractor={(item) => item.show.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Banner Slider */}
      <View style={styles.main}>
      <FlatList
        ref={flatListRef}
        data={bannerData}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.show.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={currentIndex}
      />
      </View>
   

    
      {renderShowSlider('Popular Shows', shows.slice(0, 10))}
      {renderShowSlider('Trending Now', shows.slice(0, 10))}
      {/* {renderShowSlider('New Releases', shows.slice(20, 30))} */}


      <CustomFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  bannerItem: {
    width: width,
    height: 250,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sliderContainer: {
    marginVertical: 10,
  },
  sliderTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Home;
