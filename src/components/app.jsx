import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
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

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const prefix = Linking.createURL('/');

export default () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        CreatorProfile: 'creatorprofile',
        NFTDetail: 'nftdetail',
      },
    },
  };

  // TODO Move this to the new user screen, where we will register the user's expo push token in the db
  const notificationListener = useRef();
  const responseListener = useRef();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Push Notification local para testar',
        body: 'Ola Andreas e Gonçalo',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 3 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.modelName === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        setNotification(newNotification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        console.log('o que e isto');
      });

    schedulePushNotification();
    Notifications.registerTaskAsync(Constants.manifest?.extra?.task_name);
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
