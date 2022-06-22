import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NFTPopTypes } from '@utils/proptypes';
import {
  Alert, Pressable, Text, TouchableOpacity, View,
} from 'react-native';
import { Loading } from '@library';
// import CommentIcon from '@assets/icons/comment.svg';
import ShareIcon from '@assets/icons/share.svg';
import HeartIcon from '@assets/icons/heart.svg';
import HeartFilledIcon from '@assets/icons/heart_filled.svg';
import { addLike, removeLike } from '@services/nft_like';
import { fetchNFTByTokenID } from '@features/nft';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import styles from './styles';

const SocialInfo = ({ nft }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onLikePress = async () => {
    setIsLoading(true);
    if (nft.currentUserLike) {
      if (!await removeLike(nft.tokenId)) {
        Alert.alert('Something went wrong, please try again');
      }
    } else if (!await addLike(nft.tokenId)) {
      Alert.alert('Something went wrong, please try again');
    }
    dispatch(fetchNFTByTokenID({ tokenId: nft.tokenId, forceRefresh: true }));
    setIsLoading(false);
  };

  const shareImage = async (image) => {
    const downloadPath = `${FileSystem.cacheDirectory}fileName.jpg`;
    // Antes do download queria verificar se o file ja existe, para não estar a sacar duas vezes
    // Mas não há nada nos docs que suporte isto
    const { uri: localUrl } = await FileSystem.downloadAsync(image, downloadPath);

    await Sharing.shareAsync(localUrl);

    // Delete after share?
    FileSystem.deleteAsync(localUrl);
  };

  return (
    <View style={styles.detailsContainer}>
      <Loading visible={isLoading} />
      {/* TODO: ADD Comments feature;
      <View style={styles.iconTextContainer}>
      <CommentIcon width={16} height={16} />
      <Text style={styles.detailText}>{`${nft.comments} comments`}</Text>
    </View> */}
      <View style={styles.iconTextContainer}>
        <TouchableOpacity onPress={onLikePress}>
          {nft.currentUserLike
            ? <HeartFilledIcon width={18.34} heigth={16} />
            : <HeartIcon width={18.34} height={16} />}
        </TouchableOpacity>
        <Text style={styles.detailText}>{nft.likes}</Text>
      </View>
      <Pressable
        style={[styles.iconTextContainer, styles.shareContainer]}
        onPress={() => shareImage(nft.image)}
      >
        <Text style={styles.shareText}>Share</Text>
        <ShareIcon width={12.8} heigth={16} />
      </Pressable>
    </View>
  );
};

SocialInfo.propTypes = {
  // eslint-disable-next-line react/require-default-props
  nft: NFTPopTypes,
};

export default React.memo(SocialInfo);
