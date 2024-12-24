import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, ActivityIndicator, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 

const SearchScreen = () => {
  const navigation = useNavigation(); 


  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults([]); 
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      setResults(res.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(); 
    } else {
      setResults([]); 
    }
  }, [searchTerm]);

  const renderItem = ({ item }) => {
    const show = item.show;
    const imageUrl = show.image?.original || 'https://via.placeholder.com/200x200/000000/FFFFFF/?text=No+Image';

    return (
      <TouchableOpacity style={styles.showItem} onPress={() => navigation.navigate('ShowDetails', { showId: show.id })}>
        <Image source={{ uri: imageUrl }} style={styles.showImage} />
        <Text style={styles.showTitle}>{show.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search for shows..."
        placeholderTextColor="#999"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch} 
      />

      
      {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}

      
      {!loading && results.length === 0 && searchTerm.trim() !== '' && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={3} 
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color="#fff" /> : null}
        columnWrapperStyle={styles.columnWrapper} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  showItem: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 8,
  },
  showImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  showTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  noResultsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between', 
    marginBottom: 10, 
  },
});

export default SearchScreen;
