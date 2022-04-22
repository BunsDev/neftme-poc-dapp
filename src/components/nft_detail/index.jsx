import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { getNFT } from "@services/nft";
import BackIcon from "@assets/icons/back.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Loading, TruncatedText } from "@library";
import styles from "./styles";
import SocialInfo from "../home/timeline/nft/social_info";
import Tokenomics from "../home/timeline/nft/tokenomics";
import CarouselItem from "./carousel_item";
import NftItem from "./nft_item";
import categories from "./nft_categories";
import StakeModal from "./stake_modal";
import UnstakeModal from "./unstake_modal"
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useSmartContract } from "@hooks";
import Constants from "expo-constants";

const NFTDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const [unstakeModalVisible, setUnstakeModalVisible] = useState(false);
  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { getContractMethods } = useSmartContract();
  const connector = useWalletConnect();

  useEffect(async () => {
    setIsLoading(true);
    setNftData(await getNFT(route.params.nftID));
    setShowUnstake(await getUserStakedAmount());
    setIsLoading(false)
  }, []);

  const getUserStakedAmount = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address
    );
    try {
      let response = await contractMethods.stakes(nftData.tokenId, connector.accounts[0]).call();
      let amount = response.amount * 10 ** -18;
      setUserStakedAmount(amount);
      if (amount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err){   
      //log error :) or not
    }
    return false
  };

  if (nftData === null) return <View />;

  return ( 
    <>{!isLoading && 
      <ScrollView style={styles.scrollView}>
        <Loading visible={isLoading} />
        <Pressable style={styles.backIcon} onPress={navigation.goBack}>
          <BackIcon width={18.67} height={18.67} />
        </Pressable>
        <Image source={{ uri: nftData.image }} style={styles.image} />
        <View>
          <SocialInfo nft={nftData} />
          <Text style={styles.nftTitle}>{nftData.title}</Text>
          <TruncatedText
            text={nftData.description}
            textStyle={styles.nftDescription}
          />
          <View style={styles.tokenomicsContainer}>
            <StakeModal
              nftTokenId={nftData.tokenId}
              stakeModalVisible={stakeModalVisible}
              setStakeModalVisible={setStakeModalVisible}
            />
            <UnstakeModal
              	nftTokenId={nftData.tokenId}
                unstakeModalVisible={unstakeModalVisible}
                setUnstakeModalVisible={setUnstakeModalVisible}
                stakedAmount={userStakedAmount}
            />
            <Tokenomics nft={nftData} />
            <View style={styles.tokenomicsCard}>
              <Button
                buttonStyle={styles.stakeButton}
                onPress={() => setStakeModalVisible(true)}
                text="Stake $NEFT"
                textStyle={styles.stakeText}
              />
              {!!showUnstake && (
                <Button
                  buttonStyle={styles.unstakeButton}
                  onPress={() => setUnstakeModalVisible(true)}
                  text="Unstake $NEFT"
                  textStyle={styles.stakeText}
                />
              )}
              {!showUnstake && (
                <Button
                  primary={false}
                  buttonStyle={styles.makeOfferButton}
                  onPress={() => Alert.alert("Available soon")}
                  text="Make an Offer"
                  textStyle={styles.makeOfferText}
                />
              )}
            </View>
            {!!showUnstake && (
              <View style={styles.tokenomicsCardUnstake}>
                <Button
                  primary={false}
                  buttonStyle={styles.makeOfferButtonUnstake}
                  onPress={() => Alert.alert("Available soon")}
                  text="Make an Offer"
                  textStyle={styles.makeOfferText}
                />
              </View>
            )}
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
    }
    </>
  );
};

export default NFTDetail;
