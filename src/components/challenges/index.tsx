import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectUser from './challenge_from_+/select_user';
import CommandCentre from './command_centre/command_centre';
import WriteChallenge from './challenge_from_+/write_challenge';
import TextChallenge from './challenge_from_+/text/text_challenge';
import AudioChallenge from './challenge_from_+/audio/audio_nft';
import VideoChallenge from './challenge_from_+/video/video_challenge';
const Stack = createNativeStackNavigator();

const StartChallenge = () => (
  <Stack.Navigator
    initialRouteName="SelectUser"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="SelectUser" component={SelectUser} />
    <Stack.Screen name="CommandCentre" component={CommandCentre} />
    <Stack.Screen name="WriteChallenge" component={WriteChallenge} />
    <Stack.Screen name="AudioChallenge" component={AudioChallenge} />
    <Stack.Screen name="VideoChallenge" component={VideoChallenge} />
    <Stack.Screen name="TextChallenge" component={TextChallenge} />
  </Stack.Navigator>
);

export default StartChallenge;
