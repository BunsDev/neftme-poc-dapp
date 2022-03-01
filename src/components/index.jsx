import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import Start from './start';
import Home from './home';
import CreatorProfile from './profile/creator_profile';
import MyProfile from './profile/my_profile';
import NFTDetail from './nft_detail';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="NFTDetail" component={NFTDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);

registerRootComponent(App);
