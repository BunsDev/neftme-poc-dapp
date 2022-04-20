import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Constants from 'expo-constants';
import Web3 from 'web3';
import nftABI from '../abi/neftme.json';
import {
    Alert} from 'react-native';

const configs = Constants.manifest.extra;

const useChainCheck = () => {
    const connector = useWalletConnect();
    const provider = new WalletConnectProvider({
      rpc: {
        [configs.alfajoresChainId]: configs.alfajoresRpcUrl,
      },
      connector,
      qrcode: false,
    });

const checkChain = () => {
    console.log("Alolalo");
    console.log( connector.chainId);
  if(!connector?.connected || connector?.chainId !== configs.chainId){
      console.log("aqui");
    Alert.alert(
        "Connected to wrong blockchain!",
        "You are currently not connected to the Alfajores chain, to procede, please switch network",
        [
          { text: "Switch", onPress: () => changeToAlfajores() }
        ]
      );
  }
}

  async function changeToAlfajores(){
    await provider.enable();

    const web3 = new Web3(provider);
    web3.eth.Contract.call
    web3.eth.call({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: 1 }],
        });
    /*web3.eth.call({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: configs.neftmeErc20NEFTAddress, // The address that the token is at.
            symbol: "NEFT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18 // A string url of the token logo
          },
        },
      })*/
  }

  return { checkChain };
};

export default useChainCheck;
