import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const commentIcon = require('@assets/icons_web/comment.png');
const shareIcon = require('@assets/icons_web/share.png');
const heartIcon = require('@assets/icons_web/heart.png');

const SocialInfo = ({ nft }) => (
  <View style={styles.detailsContainer}>
    <View style={styles.iconTextContainer}>
      <Image source={commentIcon} style={{ width: 16, height: 16 }} />
      <Text style={styles.detailText}>{`${nft.comments} comments`}</Text>
    </View>
    <View style={[styles.iconTextContainer, styles.detailCenter]}>
      <Image source={heartIcon} style={{ width: 18.34, height: 16 }} />
      <Text style={styles.detailText}>{`${nft.likes} likes`}</Text>
    </View>
    <View style={[styles.iconTextContainer, styles.shareContainer]}>
      <Image source={shareIcon} style={{ width: 12.8, height: 16 }} />
      <Text style={styles.detailText}>Share</Text>
    </View>
  </View>
);

SocialInfo.propTypes = {
  nft: PropTypes.shape({
    comments: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default SocialInfo;
