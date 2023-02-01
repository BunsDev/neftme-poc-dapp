import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from './categories';
import ChooseLogin from './choose_login';
import InfoScreen from './info_screen';
import ProfilePhoto from './profile_photo';
import Wallet from './wallet';
import InviteCodeModal from './invite_code_modal';

const Stack = createNativeStackNavigator();

const StartScreen = () => {

  return (
  <Stack.Navigator initialRouteName="InviteCodeModal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="InviteCodeModal" component={InviteCodeModal} />
    <Stack.Screen name="InfoScreen" component={InfoScreen} />
    <Stack.Screen name="ChooseLogin" component={ChooseLogin} />
    <Stack.Screen name="Wallet" component={Wallet} />
    <Stack.Screen name="Categories" component={Categories} />
    <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} />
  </Stack.Navigator>
  );
};

export default StartScreen;
