import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectUser from './select_user';

const Stack = createNativeStackNavigator();

const StartChallenge = () => (
  <Stack.Navigator initialRouteName="SelectUser" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SelectUser" component={SelectUser} />
  </Stack.Navigator>
);

export default StartChallenge;
