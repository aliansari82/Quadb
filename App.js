import React from 'react';
import { View, Text, Button } from 'react-native';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/App/Navigation/DrawerNavigation';
import StackNavigator from './src/App/Navigation/StackNavigator';



export default function App() {
  return (
    <NavigationContainer>
         <StackNavigator/>
    </NavigationContainer>
  );
}
