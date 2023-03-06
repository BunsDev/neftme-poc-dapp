import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import store from './store';
import Splash from './splash';
import Start from './start';
import Home from './home';
import CreatorProfile from './profile/creator_profile';
import EditProfile from './profile/edit_profile';
import MyProfile from './profile/my_profile';
import NFTDetail from './nft_detail';
import CreateNFT from './create_nft';
import Search from './search';
import StartChallenge from './challenges/index';
import Challenge from '../model/challenge_model';

type ParamsList = {
  challenge: Challenge,
};

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="NFTDetail" component={NFTDetail} />
          <Stack.Screen name="CreateNFT" component={CreateNFT} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="StartChallenge" component={StartChallenge} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  </QueryClientProvider>
);
