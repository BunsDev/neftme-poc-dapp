import { useRoute } from "@react-navigation/native";
// Tem de ser SEMPRE esta a ordem de IMPORT
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
/////////////////////////////////
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import nftABI from "../../abi/neftme.json";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { postNft, bindTokenId } from "@services/nft";
import { Button, CustomTextInput, InputField } from "@library";
import Slider from "@react-native-community/slider";
import Header from "./header";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#21212b",
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  priceInput: {
    fontSize: 56,
    paddingVertical: 54.5,
    textAlign: "center",
  },
  marginTop16: {
    marginTop: 16,
  },
  sliderContainer: {
    marginVertical: 32,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  slider: {
    width: "78%",
    height: 40,
  },
  percentageInput: {
    width: "18%",
    textAlign: "center",
    paddingVertical: 16,
    marginTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
});

//Converts amount to amount * 10**3
function convertToNFTAmount(amount) {
  return amount * 10 ** 3;
}

const CreateNFTTokenomics = () => {
  const route = useRoute(); // POST route.params.nft + price + communityPercentage
  const [price, setPrice] = useState("");
  const [communityPercentage, setCommunityPercentage] = useState(0);

  const connector = useWalletConnect();

  async function getUserTokenIDs(address) {
    let tokenIdArr = [];

    await provider.enable();

    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const neftme = new ethers.Contract(
      Constants.manifest.extra.neftme_erc721_address,
      nftABI,
      signer
    );
    let number = await neftme.balanceOf(address);

    let arr = [];
    arr.push(number);
    //console.log("NUMERO DE NFTS OWNED "+String(arr[0]));

    for (var i = 0; i < number; i++) {
      tokenIdArr.push(await neftme.tokenOfOwnerByIndex(address, i));
      //console.log("TOKEN ID DO nº " +i+ ": " + tokenIdArr[i]);
    }
    return tokenIdArr;
  }

  async function mintNFT() {
    let nftInfo = postNft(route);

    const provider = new WalletConnectProvider({
      rpc: {
        44787: Constants.manifest.extra.alfajores_rpc_url,
      },
      chainId: 44787,
      connector: connector,
      //qrcode has to be false otherwise there are problems
      qrcode: false,
    });

    await provider.enable();

    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const neftme = new ethers.Contract(
      Constants.manifest.extra.neftme_erc721_address,
      nftABI,
      signer
    );

    await neftme.mint(
      connector.accounts[0],
      nftInfo.url,
      convertToNFTAmount(communityPercentage)
    );
    //Chamar get token id
    let arrayTokens = await getUserTokenIDs(connector.accounts[0]);
    let lastTokenId = arrayTokens[arrayTokens.length - 1];
    bindTokenId(lastTokenId);
  }

  return (
    <View style={styles.container}>
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
                onChangeText={(text) =>
                  setCommunityPercentage(text.replace("%", ""))
                }
              />
            </View>
          </View>
          <Button
            text="Mint NFT"
            buttonStyle={price ? {} : { backgroundColor: "#41414A" }}
            onPress={mintNFT}
            textStyle={{}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNFTTokenomics;
