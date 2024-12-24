import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import CustomFooter from './Footer';

const ShowDetails = ({ route }) => {
  const { showId } = route.params; 
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchShowDetails = async () => {
    try {
      const res = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
      setShowDetails(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching show details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowDetails();
  }, [showId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!showDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Show details not found!</Text>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
            <ScrollView style={styles.container}>
      <Image
        source={{ uri: showDetails.image?.original || 'https://via.placeholder.com/500x250' }}
        style={styles.bannerImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{showDetails.name}</Text>
        <Text style={styles.genres}>{showDetails.genres.join(', ')}</Text>
        <Text style={styles.summary}>{showDetails.summary.replace(/<[^>]+>/g, '')}</Text>
      </View>
     
    </ScrollView>
         <CustomFooter/>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  bannerImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  genres: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 5,
  },
  summary: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ShowDetails;
