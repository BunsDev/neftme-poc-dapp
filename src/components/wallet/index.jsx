import React, {  } from "react";
// Tem de ser SEMPRE esta a ordem de IMPORT
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";
/////////////////////////////////
import {
  View, StyleSheet, Dimensions, Text, Image, TouchableOpacity
} from "react-native";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import nftABI from '../../abi/neftme.json'
import Constants from 'expo-constants';


const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

/*
    User address gets stores in connector.accounts[0]
*/
const Wallet = () => {

  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  
    return (
      <View style={styles.container}>
       {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
          
        </>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(0,0,200,200)"
      />
        <TouchableOpacity onPress={mintNFT} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Mint NFT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getUserTokenIDs} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Get my token ids</Text>
        </TouchableOpacity>
    </View>
    );

};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
