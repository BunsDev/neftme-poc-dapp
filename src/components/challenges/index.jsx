import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const StartScreen = () => (
  <Stack.Navigator initialRouteName="InfoScreen" screenOptions={{ headerShown: false }}>
    
  </Stack.Navigator>
);

export default StartScreen;
