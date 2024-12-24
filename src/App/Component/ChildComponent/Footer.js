import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const CustomFooter = () => {
  const [activeTab, setActiveTab] = useState('Home'); // Track the active tab
const navigate = useNavigation()
  const navigateTo = (screen) => {
    setActiveTab(screen); // Set the active tab
    navigate.navigate(screen)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        onPress={() => navigateTo('Home')}
        style={[styles.tab, activeTab === 'Home' && styles.activeTab]}
      >
        {/* <View
          style={[
            styles.iconPlaceholder,
            activeTab === 'Home' && styles.activeIconPlaceholder,
          ]}
        /> */}
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Home' && styles.activeTabLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity
        onPress={() => navigateTo('Search')}
        style={[styles.tab, activeTab === 'Search' && styles.activeTab]}
      >
        {/* <View
          style={[
            styles.iconPlaceholder,
            activeTab === 'Search' && styles.activeIconPlaceholder,
          ]}
        /> */}
        <Text
          style={[
            styles.tabLabel,
            activeTab === 'Search' && styles.activeTabLabel,
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderTopColor: '#444',
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#333', // Highlight active tab
    borderRadius: 10,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#888', // Default icon placeholder color
    borderRadius: 12,
    marginBottom: 5,
  },
  activeIconPlaceholder: {
    backgroundColor: '#FFF', // Highlight active icon
  },
  tabLabel: {
    fontSize: 14,
    paddingVertical:10,
    color: '#fff', // Default label color
  },
  activeTabLabel: {
    color: '#FFD700', // Highlight active label
  },
});

export default CustomFooter;
