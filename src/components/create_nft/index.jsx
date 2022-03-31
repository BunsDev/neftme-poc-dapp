import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Gallery from './gallery';

const Stack = createNativeStackNavigator();

const CreateNFT = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Gallery" component={Gallery} />
  </Stack.Navigator>
);

export default CreateNFT;
