import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const Nft = ({ nft }) => (
  <View style={styles.headerContainer}>
    <View style={styles.nftHeader}>
      <Image source={{ uri: nft.profilePhoto }} style={styles.nftProfilePhoto} />
      <View style={styles.nftHeaderTitle}>
        <Text style={styles.nftHeaderName}>{nft.name}</Text>
        <Text style={styles.nftHeaderFollowers}>{`${nft.followers} Followers`}</Text>
      </View>
    </View>
    <View>
      <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={66.6} height={70} />
      <Image source={{ uri: nft.image }} style={styles.nftNFTPhoto} />
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

Nft.propTypes = {
  nft: PropTypes.shape({
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    staked: PropTypes.number.isRequired,
    profitPercentage: PropTypes.number.isRequired,
    supporters: PropTypes.number.isRequired,
  }).isRequired,
};

export default Nft;
