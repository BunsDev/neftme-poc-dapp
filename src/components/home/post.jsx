import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import TokenIcon from '@assets/icons/token_logo';
import CommentIcon from '@assets/icons/comment';
import ShareIcon from '@assets/icons/share';
import HeartIcon from '@assets/icons/heart';
import styles from './styles';

const Post = ({ post }) => (
  <View style={styles.headerContainer}>
    <View style={styles.postHeader}>
      <Image source={{ uri: post.profilePhoto }} style={styles.postProfilePhoto} />
      <View style={styles.postHeaderTitle}>
        <Text style={styles.postHeaderName}>{post.name}</Text>
        <Text style={styles.postHeaderFollowers}>{`${post.followers} Followers`}</Text>
      </View>
    </View>
    <Image source={{ uri: post.image }} style={styles.postNFTPhoto} />
    <View style={styles.detailsContainer}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <View style={styles.iconsContainer}>
        <ShareIcon style={styles.mediaIcons} />
        <CommentIcon style={styles.mediaIcons} />
        <HeartIcon style={styles.mediaIcons} />
      </View>
    </View>
    <Text style={styles.postDescription}>{post.description}</Text>
    <View style={styles.horizontalLine} />
    <View style={styles.stakedContainer}>
      <TokenIcon />
      <Text style={styles.stakedStyle}>{`${post.staked} nefts staked`}</Text>
    </View>
    <Text style={styles.economicDetails}>
      <Text style={{ fontWeight: '700' }}>{`${post.profitPercentage}% `}</Text>
      <Text>goes to</Text>
      <Text style={{ fontWeight: '700' }}>{` ${post.supporters} supporters`}</Text>
    </Text>
  </View>
);

Post.propTypes = {
  post: PropTypes.shape({
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

export default Post;
