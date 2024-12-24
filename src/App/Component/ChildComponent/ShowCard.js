import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ShowCard = ({ show, navigation }) => {
  const handlePress = () => {
    navigation.navigate('ShowDetails', { showId: show?.show?.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        source={{ uri: show?.show?.image?.medium || 'https://via.placeholder.com/100x150' }}
        style={styles.image}
      />
      <Text style={styles.title}>{show?.show?.name || 'Unnamed Show'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 120,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShowCard;
