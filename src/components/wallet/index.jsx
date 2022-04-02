import React, { useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Image,
} from 'react-native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    width: 160,
    height: 65,
  },
  buttonStyle: {
    backgroundColor: '#fff',
    color: '#FFFFFF',
    borderRadius: 8,
  },
  buttonTextStyle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 16,
    paddingLeft: 54,
    paddingRight: 54,
  },
});

const logo = require('@assets/logo_home.webp');

const Wallet = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const connectWallet = React.useCallback(() => connector.connect(), [connector]);

  useEffect(() => {
    if (connector && connector.connected) {
      navigation.navigate('Home');
    }
  }, [connector]);

  return (
    <LinearGradient
      colors={['#201f2a', '#111012']}
      start={[0, 0]}
      end={{ x: 0, y: 1 }}
      style={styles.flex}
    >
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        {!connector.connected && (
          <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default Wallet;
