import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, Text, View,
} from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage, TruncatedText } from '@library';
import { pluralizeFollowers } from '@utils/words';
import SocialInfo from './social_info';
import Tokenomics from './tokenomics';
import styles from './styles';

const Nft = ({ nft, setNft }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nftHeader}>
        <ProfileImage
          profileImage={nft.profilePhoto}
          containerStyle={{
            ...styles.profileImageContainer,
            backgroundColor: nft.profileColor,
          }}
          imageStyle={styles.nftProfilePhoto}
          avatarWidth={30}
          avatarHeight={30}
        />
        <View style={styles.nftHeaderTitle}>
          <Text style={styles.nftHeaderName}>{nft.name}</Text>
          <Text style={styles.nftHeaderFollowers}>{`${nft.followers} ${pluralizeFollowers(nft.followers)}`}</Text>
        </View>
      </View>
      <View>
        {/* TODO: ADD Save Favorite feature;
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} /> */}
        <Pressable onPress={() => navigation.navigate('NFTDetail', { nftID: nft.id })}>
          <Image source={{ uri: nft.image }} style={styles.nftNFTPhoto} />
        </Pressable>
      </View>
      <SocialInfo nft={nft} setNft={setNft} />
      <Text style={styles.nftTitle}>{nft.title}</Text>
      <TruncatedText text={nft.description} textStyle={styles.nftDescription} />
      <View style={styles.horizontalLine} />
      <Tokenomics nft={nft} />
    </View>
  );
};

Nft.propTypes = {
  nft: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    profilePhoto: PropTypes.string,
    profileColor: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setNft: PropTypes.func.isRequired,
};

export default Nft;
