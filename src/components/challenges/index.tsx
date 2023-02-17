import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectUser from './challenge_from_+/select_user';
import CommandCentre from './command_centre/command_centre';

const Stack = createNativeStackNavigator();

const StartChallenge = () => (
  <Stack.Navigator
    initialRouteName="SelectUser"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SelectUser" component={SelectUser} />
    <Stack.Screen name="CommandCentre" component={CommandCentre} />
  </Stack.Navigator>
);

export default StartChallenge;
