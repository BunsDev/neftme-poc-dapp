import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, Text, View,
} from 'react-native';
import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const Nft = ({ nft }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nftHeader}>
        <Image source={{ uri: nft.profilePhoto }} style={styles.nftProfilePhoto} />
        <View style={styles.nftHeaderTitle}>
          <Text style={styles.nftHeaderName}>{nft.name}</Text>
          <Text style={styles.nftHeaderFollowers}>{`${nft.followers} Followers`}</Text>
        </View>
      </View>
      <View>
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} />
        <Pressable onPress={() => navigation.navigate('NFTDetail', { nftID: nft.id })}>
          <Image source={{ uri: nft.image }} style={styles.nftNFTPhoto} />
        </Pressable>
      </View>
      <SocialInfo nft={nft} />
      <Text style={styles.nftTitle}>{nft.title}</Text>
      <Text style={styles.nftDescription}>
        {nft.description}
        <Text style={styles.readMoreText}> more</Text>
      </Text>
      <View style={styles.horizontalLine} />
      <Tokenomics nft={nft} />
    </View>
  );
};

Nft.propTypes = {
  nft: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Nft;
