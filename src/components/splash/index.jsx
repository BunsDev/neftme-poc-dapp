import React, { useEffect } from 'react';
import SplashImage from '@assets/splash.svg';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { isNewUser } from '@services/user';
import { getData, removeData, setData } from '@services/storage';
import { useCheckUserSession } from '@hooks';
import Constants from 'expo-constants';

const Splash = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const { sessionChecked } = useCheckUserSession();

  useEffect(async () => {
    if (connector && sessionChecked) {
      if (await getData('cleanup_session') !== 'done') {
        connector.killSession();
        await removeData('auth_token');
        await setData('cleanup_session', 'done');
        navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{ name: 'Start' }],
        }));
      } else if (connector.connected && connector.chainId === Constants.manifest.extra.chainId) {
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
