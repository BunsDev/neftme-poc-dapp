import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Pressable, Text, TouchableOpacity, View,
} from 'react-native';
import { Loading } from '@library';
// import CommentIcon from '@assets/icons/comment.svg';
import ShareIcon from '@assets/icons/share.svg';
import HeartIcon from '@assets/icons/heart.svg';
import { addLike, removeLike } from '@services/nft_like';
import styles from './styles';

const SocialInfo = ({ nft, setNft }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onLikePress = async () => {
    // TODO: Move this to Redux;
    setIsLoading(true);
    if (nft.currentUserLike) {
      if (await removeLike(nft.id)) {
        setIsLoading(false);
        setNft({
          ...nft,
          likes: nft.likes - 1,
          currentUserLike: false,
        });
      }
    } else if (await addLike(nft.id)) {
      setIsLoading(false);
      setNft({
        ...nft,
        likes: nft.likes + 1,
        currentUserLike: true,
      });
    }
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
            ? <ShareIcon width={12.8} heigth={16} />
            : <HeartIcon width={18.34} height={16} />}
        </TouchableOpacity>
        <Text style={styles.detailText}>{nft.likes}</Text>
      </View>
      <Pressable style={[styles.iconTextContainer, styles.shareContainer]} onPress={() => Alert.alert('Available soon')}>
        <Text style={styles.shareText}>Share</Text>
        <ShareIcon width={12.8} heigth={16} />
      </Pressable>
    </View>
  );
};

SocialInfo.propTypes = {
  nft: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    currentUserLike: PropTypes.bool.isRequired,
  }).isRequired,
  setNft: PropTypes.func.isRequired,
};

export default SocialInfo;
