import React, { useCallback, useEffect } from "react";
import { Image, View, Text, Alert } from "react-native";
import { Button } from "@library";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from "@react-navigation/native";
import { isNewUser } from "@services/user";
import Constants from "expo-constants";
import { withOnboardingView } from "@hocs";
import styles from "./wallet_styles";
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

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
  const connectWallet = useCallback(() => {
    
    if (
      !connector?.connected ||
      connector?.chainId !== Constants.manifest.extra.chainId
    ) {
      Alert.alert(
        "Connected to wrong blockchain!",
        "You are currently not connected to the Alfajores Testnet, to procede, please switch network",
        [
          { text: "Switch", onPress: () => changeToAlfajores() }
        ]
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

  async function changeToAlfajores(){
    const provider = new WalletConnectProvider({
      rpc: {
        [Constants.manifest.extra.chainId] : Constants.manifest.extra.alfajoresRpcUrl,
      },
      connector,
      qrcode: false,
    });

    await provider.enable();
    /*await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: Constants.manifest.extra.neftmeErc20NEFTAddress, // The address that the token is at.
          symbol: "NEFT", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18 // A string url of the token logo
        },
      },
    })}catch(error){
      console.log(error);
    }*/

    const web3 = new Web3(provider);
    try{
    await web3.currentProvider.send({
      method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(44787) }],
        from: connector.accounts[0] 
      }).then(connector.killSession())
      
    }catch (switchError) {
      console.log(switchError);
      //Error code for when chain is not found
      if (switchError.code === 4902) {
        try{
        await web3.currentProvider.send({
          method: 'wallet_addEthereumChain',
            params: [
                      { 
                        chainId: web3.utils.toHex(44787),
                        chainName: "Alfajores Testnet",
                        rpcUrls: ['https://alfajores-forno.celo-testnet.org']
                      }],
            from: connector.accounts[0] 
          });
        }catch(addError) {
          // handle "add" error
        }
      }   
    }

    provider.rpcUrl = Constants.manifest.extra.alfajoresRpcUrl;
    provider.chainId = Constants.manifest.extra.chainId;
    await provider.enable();
    console.log("antes");
    console.log(provider.chainId);
    console.log(web3.chainId);
    navigation.navigate("Home");
  }

  useEffect(async () => {
    if (
      connector?.connected &&
      connector?.chainId === Constants.manifest.extra.chainId
    ) {
      if (await isNewUser()) {
        navigation.navigate("Start", {
          screen: "Categories",
        });
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
