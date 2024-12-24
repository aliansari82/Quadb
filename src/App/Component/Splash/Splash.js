
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  
  const navigation = useNavigation();

  useEffect(() => {
   
    const timer = setTimeout(() => {
      navigation.replace('Home'); 
    }, 2000);

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Quadb</Text>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
});

export default Splash;
