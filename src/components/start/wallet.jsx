import React, { useCallback, useEffect } from "react";
import { Image, View, Text, Alert } from "react-native";
import { Button } from "@library";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";
import { isNewUser } from "@services/user";
import Constants from "expo-constants";
import { useChainCheck } from "@hooks";
import { withOnboardingView } from "@hocs";
import styles from "./wallet_styles";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const walletConnectImage = require("@assets/wallet_connect.png");
const metamaskImage = require("@assets/metamask.png");
const valoraImage = require("@assets/valora.png");
const rainbowImage = require("@assets/rainbow.png");

const IconComponent = (source) => () =>
  <Image source={source} style={styles.image} />;

const goToNextStep = async (navigation) => {
  if (await isNewUser()) {
    navigation.navigate("Start", {
      screen: "Categories",
    });
  } else {
    navigation.navigate("Home");
  }
};

const Wallet = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const {changeToAlfajores, addNEFTtoWallet } = useChainCheck();

  const connectWallet = useCallback(() => {
    if (
      !connector?.connected ||
      connector?.chainId !== Constants.manifest.extra.chainId
    ) {
      Alert.alert(
        "Connected to wrong blockchain!",
        "You are currently not connected to the Alfajores Testnet, to procede, please switch network",
        [{ text: "Switch", onPress: () => changeToAlfajores() }]
      );
    } else {
      try {
        connector.connect().catch(() => {});
      } catch (err) {
        console.log(err);
        // TODO: LOG ERRORS;
      }
    }
  }, [connector]);

  useEffect(async () => {
    if (
      connector?.connected &&
      connector?.chainId === Constants.manifest.extra.chainId
    ) {
      if (await isNewUser()) {
        addNEFTtoWallet().then(
        navigation.navigate("Start", {
          screen: "Categories",
        }));
      } else {
        navigation.navigate("Home");
      }
    }
  }, [connector]);

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
        onPress={() => {}}
        Icon={IconComponent(metamaskImage)}
      />
      <Button
        text="Valora"
        textStyle={styles.walletButtonText}
        buttonStyle={[styles.walletButton, styles.disabledButton]}
        onPress={() => {}}
        Icon={IconComponent(valoraImage)}
      />
      <Button
        text="Rainbow"
        textStyle={styles.walletButtonText}
        buttonStyle={[styles.walletButton, styles.disabledButton]}
        onPress={() => {}}
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
  Wallet
);
