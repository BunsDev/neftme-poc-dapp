import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { getNFT } from '@services/nft';
import BackIcon from '@assets/icons/back.svg';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { Loading, TruncatedText } from '@library';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { useSmartContract } from '@hooks';
import { fetchNFTBids } from '@features/on_chain/nft';
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
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [userStakedAmount, setUserStakedAmount] = useState(0);
  const [owner, setOwner] = useState('0');
  const [creator, setCreator] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { getContractMethods } = useSmartContract();
  const connector = useWalletConnect();

  const [nftsData, setNftsData] = useState({
    stakers: [],
    activity: [],
    collection: 'coleção x',
  });

  // METODO DE VIEW COM CONTRATO ANTIGO | MUDAR PARA METODO COM CONTRATO NOVO DE VIEW
  const getUserStakedAmount = async (tokenId) => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    try {
      const response = await contractMethods
        .stakes(tokenId, connector.accounts[0])
        .call();
      setUserStakedAmount(response.amount * 10 ** -18);
    } catch (err) {
      // log error :) or not
    }
    return false;
  };

  const fillNFTDetails = async (tokenID) => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeViewContractAddress,
    );

    try {
      await contractMethods
        .nftDetails(tokenID)
        .call()
        .then((response) => {
          setCreator(response[5]);
          setOwner(response[4]);
        });
    } catch (err) {
      // log error :) or not
    }

    // TODO MUDAR PARA METODO REVISTO PELA PREXIS (NEFTME VIEW)
    try {
      const oldContractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc721Address,
      );
      const stakers = await oldContractMethods.getStakes(tokenID).call();

      setNftsData((prevData) => ({
        ...prevData,
        stakers,
      }));
    } catch (err) {
      // log error
    }
  };

  const fetchBids = async (tokenId) => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc721Address,
    );
    dispatch(fetchNFTBids({ tokenId, contractMethods }));
  };

  const fetchNftData = async () => {
    setIsLoading(true);
    const nft = await getNFT(route.params.nftTokenId);
    setNftData(nft);
    fetchBids(nft.tokenId);
    await fillNFTDetails(nft.tokenId);
    await getUserStakedAmount(nft.tokenId);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNftData();
  }, [navigation]);

  return (
    <ScrollView style={styles.scrollView}>
      <Loading visible={nftData === null || isLoading} />
      {nftData === null || isLoading ? null : (
        <>
          <Pressable style={styles.backIcon} onPress={navigation.goBack}>
            <BackIcon width={18.67} height={18.67} />
          </Pressable>
          <Image source={{ uri: nftData.image }} style={styles.image} />
          <View>
            <SocialInfo nft={nftData} setNft={setNftData} />
            <Text style={styles.nftTitle}>{nftData.title}</Text>
            <TruncatedText
              text={nftData.description}
              textStyle={styles.nftDescription}
            />
            <View style={styles.tokenomicsContainer}>
              <Tokenomics nft={nftData} />
              <View style={styles.tokenomicsCard}>
                <Stake
                  fetchNftData={fetchNftData}
                  nftTokenId={nftData.tokenId}
                  owner={owner}
                  userStakedAmount={userStakedAmount}
                />
                <Unstake
                  fetchNftData={fetchNftData}
                  nftTokenId={nftData.tokenId}
                  userStakedAmount={userStakedAmount}
                />
                <MakeOffer
                  nftTokenId={nftData.tokenId}
                  owner={owner}
                  userStakedAmount={userStakedAmount}
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
            {
              // NFT Info
              selectedCategory === categories[0].id && (
                <>
                  <NftInfoItem nftInfo={owner} isCreator={false} />
                  <NftInfoItem nftInfo={creator} isCreator />
                </>
              )
            }
            {
              // Stakers
              selectedCategory === categories[1].id
              && nftsData.stakers?.map((stakerObj) => (
                <StakersItem stakerInfo={stakerObj} key={stakerObj[0]} />
              ))
            }
            {
              // Activity
              selectedCategory === categories[2].id && (
                <>
                  <NftInfoItem nftInfo={owner} isCreator={false} />
                  <NftInfoItem nftInfo={creator} isCreator />
                </>
              )
            }
            {
              // Colection
              selectedCategory === categories[3].id && (
                <>
                  <NftInfoItem nftInfo={owner} isCreator={false} />
                  <NftInfoItem nftInfo={creator} isCreator />
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
