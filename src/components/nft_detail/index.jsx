import React, { useEffect, useState } from 'react';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
  TextInput,
} from 'react-native';
import { getNFT } from '@services/nft';
import BackIcon from '@assets/icons/back.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSmartContract } from '@hooks';
import { convertToETH18 } from '@utils/nft';
import Constants from 'expo-constants';
import styles from './styles';
import SocialInfo from '../home/timeline/nft/social_info';
import Tokenomics from '../home/timeline/nft/tokenomics';
import CarouselItem from './carousel_item';
import NftItem from './nft_item';
import categories from './nft_categories';

const NFTDetail = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const route = useRoute();
  const { getContractMethods } = useSmartContract();
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [stakeModalVisible, setStakeModalVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [tokensToStake, setTokensToStake] = useState(1);
  const [neftBalance, setNeftBalance] = useState(0);

  const getNEFTBalance = async () => {
    const contractMethods = await getContractMethods(
      Constants.manifest.extra.neftmeErc20NEFTAddress,
    );
    contractMethods.balanceOf(connector.accounts[0]).call({ from: connector.accounts[0] })
      .then(setNeftBalance);
  };

  useEffect(async () => {
    setNftData(await getNFT(route.params.nftID));
    getNEFTBalance();
  }, [connector]);

  const stakeNEFT = async () => {
    try {
      if (tokensToStake > 0) {
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeErc721Address,
        );
        contractMethods.stake(
          nftData.tokenId,
          convertToETH18(1),
        ).send({ from: connector.accounts[0] })
          .then((err, msg) => console.log('ok: ', err, msg))
          .catch((err, msg) => console.log('err: ', err, msg));
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  if (nftData === null) return <View />;

  console.log('tokensToStake: ', tokensToStake);
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
                    width: '100%',
                    height: '70%',
                    backgroundColor: '#2B2F3A',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#2B2F3A',
                  }}
                >
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setStakeModalVisible(!stakeModalVisible)}
                  >
                    <Text style={{ fontSize: 30, color: '#fff' }}>X</Text>
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
                          color: 'white',
                        }}
                        defaultValue="0"
                        value={tokensToStake}
                        onChange={setTokensToStake}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          marginTop: 30,
                          marginBottom: 10,
                        }}
                      >
                        Available:
                        {' '}
                        {neftBalance}
                        {' '}
                        $NEFT
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginHorizontal: 16,
                      }}
                    >
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake('25000')}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          25%
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake('50000')}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          50%
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake('75000')}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          75%
                        </Text>
                      </Pressable>

                      <Pressable
                        style={[styles.stakePercentageButton]}
                        onPress={() => setTokensToSkake('100000')}
                      >
                        <Text style={styles.stakePercentageButtonText}>
                          100%
                        </Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
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

export default NFTDetail;
