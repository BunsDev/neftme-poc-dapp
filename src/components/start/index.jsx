import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseLogin from './choose_login';
import Wallet from './wallet';
import Categories from './categories';
import ProfilePhoto from './profile_photo';

const Stack = createNativeStackNavigator();

const StartScreen = () => (
  <Stack.Navigator initialRouteName="ChooseLogin" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChooseLogin" component={ChooseLogin} />
    <Stack.Screen name="Wallet" component={Wallet} />
    <Stack.Screen name="Categories" component={Categories} />
    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} />
  </Stack.Navigator>
);

export default StartScreen;
