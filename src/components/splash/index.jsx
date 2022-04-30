import React, { useEffect } from 'react';
import SplashImage from '@assets/splash.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { isNewUser } from '@services/user';
import Constants from 'expo-constants';
import { removeData } from '@services/storage';
import { useGetCurrentUserQuery } from '@features/current_user';

const Splash = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const {
    data: currentUser,
    isError,
    error,
  } = useGetCurrentUserQuery();

  const navigateTo = (route) => navigation.dispatch(CommonActions.reset({
    index: 0,
    routes: [route],
  }));

  useEffect(async () => {
    if (isError && [401, 403].includes(error?.originalStatus)) {
      await removeData('auth_token');
      navigateTo({ name: 'Start' });
    }
  }, [isError, error]);

  useEffect(async () => {
    if (connector && currentUser) {
      if (connector.connected && connector.chainId === Constants.manifest.extra.chainId) {
        if (await isNewUser()) {
          navigateTo({
            name: 'Start',
            params: { screen: 'Categories' },
          });
        } else {
          navigateTo({ name: 'Home' });
        }
      } else {
        navigateTo({
          name: 'Start',
          params: { screen: 'Wallet' },
        });
      }
    }
  }, [connector, currentUser]);

  return <SplashImage width="100%" height="100%" />;
};

export default Splash;
