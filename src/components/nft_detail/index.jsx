import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { getNFT } from '@services/nft';
import BackIcon from '@assets/icons/back.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Loading, TruncatedText } from '@library';
import styles from './styles';
import SocialInfo from '../home/timeline/nft/social_info';
import Tokenomics from '../home/timeline/nft/tokenomics';
import CarouselItem from './carousel_item';
import NftItem from './nft_item';
import categories from './nft_categories';
import StakeModal from './stake_modal';

const NFTDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    setNftData(await getNFT(route.params.nftID));
    setIsLoading(false);
  }, []);

  if (nftData === null) return <View />;

  return (
    <ScrollView style={styles.scrollView}>
      <Loading visible={isLoading} />
      <Pressable style={styles.backIcon} onPress={navigation.goBack}>
        <BackIcon width={18.67} height={18.67} />
      </Pressable>
      <Image source={{ uri: nftData.image }} style={styles.image} />
      <View>
        <SocialInfo nft={nftData} setNft={setNftData} />
        <Text style={styles.nftTitle}>{nftData.title}</Text>
        <TruncatedText text={nftData.description} textStyle={styles.nftDescription} />
        <View style={styles.tokenomicsContainer}>
          <StakeModal
            nftTokenId={nftData.tokenId}
            stakeModalVisible={stakeModalVisible}
            setStakeModalVisible={setStakeModalVisible}
          />
          <Tokenomics nft={nftData} />
          <View style={styles.tokenomicsCard}>
            <Button
              buttonStyle={styles.stakeButton}
              onPress={() => setStakeModalVisible(true)}
              text="Stake $NEFT"
              textStyle={styles.stakeText}
            />
            <Button
              primary={false}
              buttonStyle={styles.makeOfferButton}
              onPress={() => Alert.alert('Available soon')}
              text="Make an Offer"
              textStyle={styles.makeOfferText}
            />
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

export default NFTDetail;
