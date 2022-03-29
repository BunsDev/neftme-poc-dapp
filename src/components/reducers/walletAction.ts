import * as Linking from 'expo-linking'
import { walletConstants } from "./constants";
import '../../../global'
import { web3, kit } from './root'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox } from 'react-native'
import {
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
/*
 The export statement is used to export the only function in the file so that the function can be called using `walletsActions.connect()`
 */
export const walletActions = {
  connect,
};

/*
This function is a simple method provided by Celo to connect to the Valora or Alfajores (for testing) wallet. The `dispatch()` is a redux function which is used to emit actions which we can then listen for in the reducer and update the state accordingly.
*/
function connect() {
  return async (dispatch: any) => {
    // This dispatch calls a function that is declared later on in the code.
    dispatch(request('Connecting to wallet'));

    // These variables are needed to connect to the wallet
    // requestId is used to identify the request so we can listen for the same request using the waitForAccoutAuth() function
    // dappName holds the name of the App the wallet will expose as requesting for the detaila
    // callback is the screen we want to send the user to after a successfull connection is made
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


    // Get the stabel token contract

    // Get the user account balance (cUSD)

    // Convert from a big number to a string by rounding it to the appropriate number of decimal places


    // These are the function calls which are dispatched when the user makes a request. The state of the app changes with the status of the request response.
    function request(message: string) {
      return { type: walletConstants.CONNECT_REQUEST, message };
    }
    function success(res: object) {
      return { type: walletConstants.CONNECT_SUCCESS, res };
    }
    function failure(error: any) {
      return { type: walletConstants.CONNECT_FAILURE, error };
    }
  }
}