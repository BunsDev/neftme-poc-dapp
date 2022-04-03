import { useNavigation, useRoute } from '@react-navigation/native';
// Tem de ser SEMPRE esta a ordem de IMPORT
import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers } from 'ethers';
/// //////////////////////////////
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import React, { useState } from 'react';
import {
  Alert, ScrollView, StyleSheet, Text, View, Modal, ActivityIndicator,
} from 'react-native';
import { postNft, bindTokenId } from '@services/nft';
import { Button, CustomTextInput, InputField } from '@library';
import Slider from '@react-native-community/slider';
import Constants from 'expo-constants';
import Header from './header';
import nftABI from '../../abi/neftme.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#21212b',
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  priceInput: {
    fontSize: 56,
    paddingVertical: 54.5,
    textAlign: 'center',
  },
  marginTop16: {
    marginTop: 16,
  },
  sliderContainer: {
    marginVertical: 32,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: '78%',
    height: 40,
  },
  percentageInput: {
    width: '18%',
    textAlign: 'center',
    paddingVertical: 16,
    marginTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
});

// Converts amount to amount * 10**3
function convertToNFTAmount(amount) {
  return amount * 10 ** 3;
}

const CreateNFTTokenomics = () => {
  const route = useRoute(); // POST route.params.nft + price + communityPercentage
  const [price, setPrice] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [communityPercentage, setCommunityPercentage] = useState(0);
  const connector = useWalletConnect();
  const navigation = useNavigation();

  const getUserTokenIDs = async (address) => {
    const tokenIdArr = [];

    const provider = new WalletConnectProvider({
      rpc: {
        44787: Constants.manifest.extra.alfajores_rpc_url,
      },
      chainId: 44787,
      connector,
      // qrcode has to be false otherwise there are problems
      qrcode: false,
    });
    await provider.enable();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();
    const neftme = new ethers.Contract(
      Constants.manifest.extra.neftme_erc721_address,
      nftABI,
      signer,
    );

    const number = await neftme.balanceOf(address);

    const arr = [];
    arr.push(number);
    // console.log("NUMERO DE NFTS OWNED "+String(arr[0]));

    for (let i = 0; i < number; i++) {
      tokenIdArr.push(await neftme.tokenOfOwnerByIndex(address, i));
      // console.log("TOKEN ID DO nº " +i+ ": " + tokenIdArr[i]);
    }
    return tokenIdArr;
  };

  const mintNFT = async () => {
    setShowLoading(true);
    try {
      const nftInfo = await postNft({
        title: route.params.nft.title,
        description: route.params.nft.description,
        price,
        communityPercentage,
        image: route.params.nft.image,
      });

      if (!nftInfo) {
        Alert.alert('NFT Mint', 'Something went wrong. Please try again', [
          { text: 'OK', onPress: () => { } },
        ]);
        return;
      }

      const provider = new WalletConnectProvider({
        rpc: {
          44787: Constants.manifest.extra.alfajores_rpc_url,
        },
        chainId: 44787,
        connector,
        // qrcode has to be false otherwise there are problems
        qrcode: false,
      });
      await provider.enable();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const neftme = new ethers.Contract(
        Constants.manifest.extra.neftme_erc721_address,
        nftABI,
        signer,
      );

      await neftme.mint(
        connector.accounts[0],
        nftInfo.url,
        convertToNFTAmount(communityPercentage),
      );

      // Chamar get token id
      const arrayTokens = await getUserTokenIDs(connector.accounts[0]);
      const lastTokenId = arrayTokens[arrayTokens.length - 1];
      setShowLoading(false);
      if (await bindTokenId(nftInfo.id, lastTokenId.hex)) {
        Alert.alert('NFT Minted', 'Your NFT was successfully minted', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        Alert.alert('NFT Mint', 'Something went wrong. Please try again', [
          { text: 'OK', onPress: () => { } },
        ]);
      }
    } catch (err) {
      setShowLoading(false);
      Alert.alert('NFT Mint', 'Something went wrong. Please try again', [
        { text: 'OK', onPress: () => { } },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {showLoading && (
        <Modal
          transparent
          animationType="none"
          visible
        >
          <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(16, 15, 18, 0.8)',
            justifyContent: 'space-around',
          }}
          >
            <View style={{
              height: 70,
              width: 70,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            >
              <ActivityIndicator animating color="white" size="large" />
            </View>
          </View>
        </Modal>
      )}
      <Header showNext={false} onPress={null} step={3} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <InputField
            labelName="Sale Price in NEFTS"
            value={price}
            onFieldChange={setPrice}
            inputPlaceholder="0"
            keyboardType="numeric"
            inputStyle={styles.priceInput}
            containerStyle={styles.marginTop16}
          />
          <View style={styles.sliderContainer}>
            <Text style={styles.labelStyle}>Percentage for community</Text>
            <View style={styles.percentageContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={communityPercentage}
                onValueChange={(v) => setCommunityPercentage(Math.round(v))}
                minimumTrackTintColor="#F6C138"
                thumbTintColor="#F6C138"
                maximumTrackTintColor="#F0F0F0"
              />
              <CustomTextInput
                inputStyle={styles.percentageInput}
                value={`${communityPercentage}%`}
                inputPlaceholder=""
                keyboardType="numeric"
                onChangeText={(text) => setCommunityPercentage(text.replace('%', ''))}
              />
            </View>
          </View>
          <Button
            text="Mint NFT"
            buttonStyle={price ? {} : { backgroundColor: '#41414A' }}
            onPress={mintNFT}
            textStyle={{}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNFTTokenomics;
