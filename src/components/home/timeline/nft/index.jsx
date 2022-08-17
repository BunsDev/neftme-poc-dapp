/* eslint-disable react/prop-types */
import React from 'react';
import { NFTPopTypes } from '@utils/proptypes';
import {
  Pressable, Text, View,
} from 'react-native';
// import SaveFavoriteIcon from '@assets/icons/save_favorite.svg';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage, TruncatedText } from '@library';
import { pluralizeFollowers } from '@utils/words';
import styles from './styles';
import Tokenomics from './tokenomics';
import SocialInfo from './social_info';
import { Post } from '../../../shared/components/Post.tsx';

const Nft = ({
  nft,
  state,
  pinchRef,
  pinchRefs,
  scrollView,
}) => {
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { username: nft.username });
  // prego
  const nftImage = nft.image;
  /// /////////////////////////////////////

  return (
    <View style={styles.headerContainer}>
      <View style={styles.nftHeader}>
        <Pressable
          onPress={navigateToProfile}
        >
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
        </Pressable>
        <View style={styles.nftHeaderTitle}>
          <Text style={styles.nftHeaderName}>{nft.name}</Text>
          <Text style={styles.nftHeaderFollowers}>{`${nft.followers} ${pluralizeFollowers(nft.followers)}`}</Text>
        </View>
      </View>
      <View>
        {/* TODO: ADD Save Favorite feature;
        <SaveFavoriteIcon style={styles.saveFavoriteIcon} width={20} height={20} /> */}
        <Pressable onPress={() => navigation.navigate(
          'NFTDetail',
          { nftTokenId: nft.tokenId },
        )}
        >
          {/* <Image source={{ uri: nft.image }} style={styles.nftNFTPhoto} /> */}
          <Post
            imageURI="https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/8bbac5ad06b4a569b8a446825f7371c81ebac821.png?alt=media&token=73b33332-c587-464b-af68-52554221b73a"
            {...{
              nftImage, state, scrollView, pinchRef, pinchRefs,
            }}
          />
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
