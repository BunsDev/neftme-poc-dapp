import React, { useEffect } from 'react';
import SplashImage from '@assets/splash.svg';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { isNewUser } from '@services/user';
import { useCheckUserSession } from '@hooks';
import Constants from 'expo-constants';

const Splash = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const { sessionChecked } = useCheckUserSession();

  useEffect(async () => {
    if (connector && sessionChecked) {
      if (connector.connected && connector.chainId === Constants.manifest.extra.chainId) {
        if (await isNewUser()) {
          navigation.navigate('Start', {
            screen: 'Categories',
          });
        } else {
          navigation.navigate('Home');
        }
      } else {
        navigation.navigate('Start', {
          screen: 'Wallet',
        });
      }
    }
  }, [connector, sessionChecked]);

  return <SplashImage width="100%" height="100%" />;
};

export default Splash;
