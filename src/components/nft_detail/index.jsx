import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Tem de ser SEMPRE esta a ordem de IMPORT (random values -> shims -> ethers)
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
  TextInput,
} from "react-native";
import { getNFT } from "@services/nft";
import BackIcon from "@assets/icons/back.svg";
import BigNumber from "big-number";
import Constants from "expo-constants";
import nftABI from "../../abi/neftme.json";
/// //////////////////////////////
import styles from "./styles";
import SocialInfo from "../home/timeline/nft/social_info";
import Tokenomics from "../home/timeline/nft/tokenomics";
import CarouselItem from "./carousel_item";
import NftItem from "./nft_item";
import categories from "./nft_categories";

const NFTDetail = ({ route: { params }, navigation }) => {
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const mTokens = 100000;
  const [tokensToStake, setTokensToSkake] = useState(mTokens);

  const buttonStakeActive = false;
  const [neftBalance, setNeftBalance] = useState(0);

  const connector = useWalletConnect();

  useEffect(async () => {
    setNftData(await getNFT(params.nftID));
    getNEFTBalance();
  }, [connector]);

  function convertToETH18(amount) {
    return BigNumber(amount * 10 ** 18);
  }
  
  function convertFromStringBigNumber(stringNumber){
    return parseInt(stringNumber) * 10**-18
  }

  async function getNEFTBalance() {
    // Replicated code -> Change to Common library after MVP
    // Config for Celo Testnet -> Alfajores | After MVP config to dynamic way
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

    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const neftme = new ethers.Contract(
      Constants.manifest.extra.neftme_erc20_NEFT_address,
      nftABI,
      signer
    );
    //console.log("aloaslodasd");
    //console.log(await neftme.balanceOf(connector.accounts[0]));

    const number = await neftme.balanceOf(connector.accounts[0])
    const arr = [];
    arr.push(number);
    
    setNeftBalance(convertFromStringBigNumber(number.toString()));
  }

  const stakeNEFT = async () => {
    // Replicated code -> Change to Common library after MVP
    // Config for Celo Testnet -> Alfajores | After MVP config to dynamic way
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

    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();
    const neftme = new ethers.Contract(
      Constants.manifest.extra.neftme_erc721_address,
      nftABI,
      signer
    );

    await neftme.stake(
      nftData.tokenId,
      convertToETH18(tokensToStake) /* amount */
    );
  };

  

  if (nftData === null) return <View />;

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable style={styles.backIcon} onPress={navigation.goBack}>
        <BackIcon width={18.67} height={18.67} />
      </Pressable>
      <Image source={{ uri: nftData.image }} style={styles.image} />
      <View>
        <SocialInfo nft={nftData} />
        <Text style={styles.nftTitle}>{nftData.title}</Text>
        <Text style={styles.nftDescription}>
          {nftData.description}
          <Text style={styles.readMoreText}> more</Text>
        </Text>
        <View style={styles.tokenomicsContainer}>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent
              visible={stakeModalVisible}
              onRequestClose={() => {
                setStakeModalVisible(!stakeModalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View
                  style={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "#2B2F3A",
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: "#2B2F3A",
                  }}
                >
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setStakeModalVisible(!stakeModalVisible)}
                  >
                    <Text style={{ fontSize: 30, color: "#fff" }}>X</Text>
                  </Pressable>

                  <View>
                    <Text style={styles.stakeTitle}>
                      How much $NEFT you want to stake?
                    </Text>

                    <View style={styles.stakeContainer}>
                      <TextInput
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                        style={{
                          fontSize: 30,
                          marginTop: 10,
                          color: "white",
                        }}
                        defaultValue="0"
                        value="2"
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "white",
                          marginTop: 30,
                          marginBottom: 10,
                        }}
                      >
                        Available: {neftBalance} $NEFT
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginHorizontal: 16,
                      }}
                    >
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake("25000")}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          25%
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake("50000")}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          50%
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake("75000")}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          75%
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake("100000")}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          100%
                        </Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginHorizontal: 16,
                      }}
                    >
                      <Pressable
                        style={[styles.stakeButtonAction]}
                        onPress={stakeNEFT}
                      >
                        <Text style={styles.stakeText}>Stake $NEFT</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <Tokenomics nft={nftData} />

          <View style={styles.tokenomicsCard}>
            <Pressable
              style={[styles.tokenomicsBaseButton, styles.stakeButton]}
              onPress={() => setStakeModalVisible(true)}
            >
              <Text style={styles.stakeText}>Stake $NEFT</Text>
            </Pressable>

            <View style={[styles.tokenomicsBaseButton, styles.makeOfferButton]}>
              <Text style={styles.makeOfferText}>Make an Offer</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item, index }) => (
            <CarouselItem
              key={`icon_profile_${index}`}
              item={item}
              index={index}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        />
      </View>
      <View style={styles.horizontalBar} />
      <View style={styles.nftDetailView}>
        {nftData.usersData[selectedCategory]?.map((nft) => (
          <NftItem
            nft={nft}
            key={`nft_${selectedCategory}_item_${nft.image}`}
          />
        ))}
      </View>
    </ScrollView>
  );
};

NFTDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      nftID: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default NFTDetail;
