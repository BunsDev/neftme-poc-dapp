import React, { useCallback, useEffect } from 'react';
import {
  Alert, Image, View, Text,
} from 'react-native';
import { Button } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useNavigation } from '@react-navigation/native';
import { isNewUser } from '@services/user';
import Constants from 'expo-constants';
import { useChainCheck } from '@hooks';
import { withOnboardingView } from '@hocs';
import styles from './wallet_styles';

const walletConnectImage = require('@assets/wallet_connect.png');
const metamaskImage = require('@assets/metamask.png');
const valoraImage = require('@assets/valora.png');
const rainbowImage = require('@assets/rainbow.png');

const IconComponent = (source) => () => <Image source={source} style={styles.image} />;

const goToNextStep = async (navigation) => {
  if (await isNewUser()) {
    navigation.navigate('Start', {
      screen: 'Categories',
    });
  } else {
    navigation.navigate('Home');
  }
};

const Wallet = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const { addNEFTtoWallet, changeToAlfajores, currentChainId } = useChainCheck();

  const connectWallet = useCallback(() => {
    try {
      connector.connect().catch(() => { });
    } catch (err) {
      // TODO: LOG ERRORS;
    }
  }, [connector]);

  useEffect(async () => {
    if (connector) {
      if (connector.connected && connector.chainId === Constants.manifest.extra.chainId) {
        if (await isNewUser()) {
          await addNEFTtoWallet();
          navigation.navigate('Start', {
            screen: 'Categories',
          });
        } else {
          navigation.navigate('Home');
        }
      } else if (connector.connected && connector.chainId !== Constants.manifest.extra.chainId) {
        Alert.alert(
          'Wrong blockchain',
          'You are not connected to the Alfajores Testnet. To proceed, please switch network',
          [{ text: 'Switch', onPress: changeToAlfajores }],
        );
      }
    }
  }, [connector, currentChainId]);

  return (
    <View style={styles.container}>
      <Button
        text="Wallet Connect"
        textStyle={styles.walletButtonText}
        buttonStyle={styles.walletButton}
        onPress={connectWallet}
        Icon={IconComponent(walletConnectImage)}
      />
      <Button
        text="MetaMask"
        textStyle={styles.walletButtonText}
        buttonStyle={[styles.walletButton, styles.disabledButton]}
        onPress={() => { }}
        Icon={IconComponent(metamaskImage)}
      />
      <Button
        text="Valora"
        textStyle={styles.walletButtonText}
        buttonStyle={[styles.walletButton, styles.disabledButton]}
        onPress={() => { }}
        Icon={IconComponent(valoraImage)}
      />
      <Button
        text="Rainbow"
        textStyle={styles.walletButtonText}
        buttonStyle={[styles.walletButton, styles.disabledButton]}
        onPress={() => { }}
        Icon={IconComponent(rainbowImage)}
      />
      <Button
        text="I don't have a wallet"
        textStyle={styles.noWalletButtonText}
        buttonStyle={styles.noWalletButton}
        onPress={() => goToNextStep(navigation)}
      />
      <View style={styles.learMoreContainer}>
        <Text style={[styles.baseText, styles.newToWalletTxt]}>
          New to wallets?
        </Text>
        <Text style={[styles.baseText, styles.learnMoreTxt]}>Learn more</Text>
      </View>
    </View>
  );
};

export default withOnboardingView((navigation) => goToNextStep(navigation))(
  Wallet,
);
