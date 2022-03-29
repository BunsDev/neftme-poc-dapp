import React from "react";
import * as Linking from 'expo-linking'
import '../../../global'
import { kit } from '../reducers/root'
import { Button, View } from 'react-native'
import {
  requestAccountAddress,
  waitForAccountAuth} from '@celo/dappkit'
/*
export async function loginnn() {
  console.log("alo");
  const requestId = "login";
  const dappName = "NEFTME App";
  const callback = Linking.createURL("https://www.google.pt");
  console.log("alo 2");

  requestAccountAddress({
    requestId,
    dappName,
    callback,
  });
  console.log("alo 3");
  //Linking.canOpenURL("https://metamask.app.link/dapp/localhost:19006")
  //let a = Linking.openURL("https://metamask.app.link/localhost:19002");
  const dappkitResponse = await waitForAccountAuth(requestId);
  //console.log(a);
  //window.open("https://metamask.app.link/dapp/")
  console.log("window open");
  // The pepper is not available in all Valora versions
  this.setState({ 
    address: dappkitResponse.address, 
    phoneNumber: dappkitResponse.phoneNumber, 
    pepper: dappkitResponse.pepper 
  });
  console.log("Teste a ver se ja tem o address");
  console.log(dappkitResponse.address);
}
*/

export default async function Wallet() {
  const requestId = 'dapplogin';
    const dappName = 'NEFTME';
    // neftme:// é o deeplink que a nossa app está pronta para receber. Ao chamar este callback, o user vai ser redirecionado para home neste caso
    const callback = Linking.createURL('neftme://');

    // This is from the Celo DappKit library, it fires up the wallet and gets the neccessary information
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    });

    //This function listens for the request above and fire up an action to be handled by a reducer.
    const dappkitResponse = await waitForAccountAuth(requestId)

    // Set the default account to the account returned from the wallet
    kit.defaultAccount = dappkitResponse.address
    console.log(dappkitResponse.address);
    console.log("##########################");
  return (
    <View>
    <Button
      onPress={login}
      title="Connect to a wallet (Metamask ou Valora"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
    />
  </View>
  );
}

