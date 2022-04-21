import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Constants from 'expo-constants';
import Web3 from 'web3';
import {
    Alert} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const configs = Constants.manifest.extra;

const useChainCheck = () => {
    const connector = useWalletConnect();
    const navigation = useNavigation();

    const provider = new WalletConnectProvider({
      rpc: {
        [configs.alfajoresChainId]: configs.alfajoresRpcUrl,
      },
      connector,
      qrcode: false,
    });

async function changeToAlfajores() {

  await provider.enable();

  const web3 = new Web3(provider);
  try {
    await web3.currentProvider.send({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(44787) }],
      from: connector.accounts[0],
    });
  } catch (switchError) {
    console.log(switchError);
    //Error code for when chain is not found
    if (switchError.code === 4902) {
      try {
        await web3.currentProvider.send({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(44787),
              chainName: "Alfajores Testnet",
              rpcUrls: [configs.alfajoresRpcUrl],
            },
          ],
          from: connector.accounts[0],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
  }
  navigation.navigate("Home");
}

async function addNEFTtoWallet() {

  await provider.enable();

  const web3 = new Web3(provider);
  try {
    await web3.currentProvider.send({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: Constants.manifest.extra.neftmeErc20NEFTAddress,
          symbol: "NEFT",
          decimals: 18,
          //TODO Enter image URL
        },
      },
    });
  } catch (err) {
    //LOG Errors
  }
}


  return { changeToAlfajores, addNEFTtoWallet };
};

export default useChainCheck;
