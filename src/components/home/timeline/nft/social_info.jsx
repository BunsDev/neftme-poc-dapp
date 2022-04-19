import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Pressable, Text, View,
} from 'react-native';
// import CommentIcon from '@assets/icons/comment.svg';
import ShareIcon from '@assets/icons/share.svg';
import HeartIcon from '@assets/icons/heart.svg';
import styles from './styles';

const SocialInfo = ({ nft }) => (
  <View style={styles.detailsContainer}>
    {/* TODO: ADD Comments feature;
      <View style={styles.iconTextContainer}>
      <CommentIcon width={16} height={16} />
      <Text style={styles.detailText}>{`${nft.comments} comments`}</Text>
    </View> */}
    <View style={styles.iconTextContainer}>
      <HeartIcon width={18.34} height={16} />
      <Text style={styles.detailText}>{`${nft.likes} likes`}</Text>
    </View>
    <Pressable style={[styles.iconTextContainer, styles.shareContainer]} onPress={() => Alert.alert('Available soon')}>
      <ShareIcon width={12.8} heigth={16} />
      <Text style={styles.detailText}>Share</Text>
    </Pressable>
  </View>
);

SocialInfo.propTypes = {
  nft: PropTypes.shape({
    comments: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default SocialInfo;
