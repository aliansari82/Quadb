


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import Splash from '../Component/Splash/Splash';
import DrawerNavigation from './DrawerNavigation';
import Home from '../Component/Home/Home';
import ShowCard from '../Component/ChildComponent/ShowCard';
import ShowDetails from '../Component/ChildComponent/ShowDetails';
import SearchScreen from '../Component/ChildComponent/Search';



const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Splash" component={Splash}    options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home}    options={{ headerShown: false }} />
      <Stack.Screen name="ShowCard" component={ShowCard}    options={{ headerShown: false }} />
      <Stack.Screen name="ShowDetails" component={ShowDetails}    options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen}    options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}
