import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
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
import { setData } from '../services/storage';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Device.osName === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default () => {
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setData('push_token', token));
  }, []);

  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatorProfile" component={CreatorProfile} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="NFTDetail" component={NFTDetail} />
        <Stack.Screen name="CreateNFT" component={CreateNFT} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
};
