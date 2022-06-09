import React from 'react';
import { NFTPopTypes } from '@utils/proptypes';
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

const Nft = ({ nft }) => {
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
        <Pressable onPress={() => navigation.navigate('NFTDetail', { nftTokenId: nft.tokenId })}>
          <Image source={{ uri: nft.image }} style={styles.nftNFTPhoto} />
        </Pressable>
      </View>
      <SocialInfo nft={nft} />
      <Text style={styles.nftTitle}>{nft.title}</Text>
      <TruncatedText text={nft.description} textStyle={styles.nftDescription} />
      <View style={styles.horizontalLine} />
      <Tokenomics tokenId={nft.tokenId} />
    </View>
  );
};

Nft.propTypes = {
  // eslint-disable-next-line react/require-default-props
  nft: NFTPopTypes,
};

export default Nft;
