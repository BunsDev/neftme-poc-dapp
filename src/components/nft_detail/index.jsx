import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, Image, Pressable, ScrollView, Text, View,
} from 'react-native';
import { getNFT } from '@services/nft';
import BackIcon from '@assets/icons/back.svg';
import styles from './styles';
import SocialInfo from '../home/timeline/nft/social_info';
import Tokenomics from '../home/timeline/nft/tokenomics';
import CarouselItem from './carousel_item';
import NftItem from './nft_item';
import categories from './nft_categories';

const NFTDetail = ({ route: { params }, navigation }) => {
  const [nftData, setNftData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  useEffect(async () => {
    setNftData((await getNFT(params.nftID)));
  }, []);

  if (nftData === null) return (<View />);

  return (
    <ScrollView style={styles.scrollView}>
      <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
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
          <Tokenomics nft={nftData} />
          <View style={styles.tokenomicsCard}>
            <View style={[styles.tokenomicsBaseButton, styles.stakeButton]}>
              <Text style={styles.stakeText}>Stake your $NEFT</Text>
            </View>
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
          <NftItem nft={nft} key={`nft_${selectedCategory}_item_${nft.image}`} />
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
