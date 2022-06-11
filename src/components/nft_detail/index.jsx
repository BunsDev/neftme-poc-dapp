import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, TruncatedText } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import {
  fetchNFTBids, fetchNFTDetails, fetchStakers, fetchUserStakes,
  selectNFTDetails, selectNFTStakers, selectNFTUserStakes,
} from '@features/on_chain/nft';
import { selectNFTTokenId } from '@features/nft';
import styles from './styles';
import SocialInfo from '../home/timeline/nft/social_info';
import Tokenomics from '../home/timeline/nft/tokenomics';
import CarouselItem from './carousel_item';
import NftInfoItem from './nftInfo_item';
import StakersItem from './stakers_item';
import categories from './nft_categories';
import MakeOffer from './make_offer';
import Stake from './stake';
import Unstake from './unstake';

const NFTDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const { getContractMethods } = useSmartContract();
  const connector = useWalletConnect();
  const nftData = useSelector((state) => selectNFTTokenId(state, route.params.nftTokenId));
  const nftDetails = useSelector((state) => selectNFTDetails(state, route.params.nftTokenId));
  const nftStakers = useSelector((state) => selectNFTStakers(state, route.params.nftTokenId));
  const nftStakes = useSelector((state) => selectNFTUserStakes(state, route.params.nftTokenId));

  useEffect(() => {
    const fetchData = async () => {
      const { neftmeErc721Address, neftmeViewContractAddress } = Constants.manifest.extra;
      const contractMethods = await getContractMethods(neftmeErc721Address);
      const viewContractMethods = await getContractMethods(neftmeViewContractAddress);

      dispatch(fetchNFTBids({ tokenId: nftData.tokenId, contractMethods }));
      dispatch(fetchNFTDetails({ tokenId: nftData.tokenId, contractMethods: viewContractMethods }));
      dispatch(fetchStakers({ tokenId: nftData.tokenId, contractMethods }));
      dispatch(fetchUserStakes({
        tokenId: nftData.tokenId, account: connector.accounts[0], contractMethods,
      }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (nftData && nftDetails?.loading === 'succeeded' && nftStakers?.loading === 'succeeded' && nftStakes?.loading === 'succeeded') {
      setTimeout(() => { setIsLoading(false); }, 500);
    }
  }, [nftData, nftDetails, nftStakers, nftStakes]);

  return (
    <ScrollView style={styles.scrollView}>
      <Loading visible={isLoading} />
      {isLoading ? null : (
        <>
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
              <Tokenomics tokenId={nftData.tokenId} />
              <View style={styles.tokenomicsCard}>
                <Stake tokenId={nftData.tokenId} owner={nftDetails.data[4]} />
                <Unstake tokenId={nftData.tokenId} />
                <MakeOffer tokenId={nftData.tokenId} owner={nftDetails.data[4]} />
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
            {
              // NFT Info
              selectedCategory === categories[0].id && (
                <>
                  <NftInfoItem nftInfo={nftDetails.data[4]} isCreator={false} />
                  <NftInfoItem nftInfo={nftDetails.data[5]} isCreator />
                </>
              )
            }
            {
              // Stakers
              selectedCategory === categories[1].id
              && nftStakers.data.map((stakerObj) => (
                <StakersItem stakerInfo={stakerObj} key={stakerObj[0]} />
              ))
            }
            {
              // Activity
              selectedCategory === categories[2].id && (
                <>
                  <NftInfoItem nftInfo={nftDetails.data[4]} isCreator={false} />
                  <NftInfoItem nftInfo={nftDetails.data[5]} isCreator />
                </>
              )
            }
            {
              // Colection
              selectedCategory === categories[3].id && (
                <>
                  <NftInfoItem nftInfo={nftDetails.data[4]} isCreator={false} />
                  <NftInfoItem nftInfo={nftDetails.data[5]} isCreator />
                </>
              )
            }
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default NFTDetail;
