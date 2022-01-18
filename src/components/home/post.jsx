import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const Post = ({ post }) => (
  <>
    <View style={styles.postHeader}>
      <Image source={post.profilePhoto} style={styles.postProfilePhoto} />
      <View style={styles.postHeaderTitle}>
        <Text style={styles.postHeaderName}>{post.name}</Text>
        <Text style={styles.postHeaderFollowers}>{`${post.followers} Followers`}</Text>
      </View>
    </View>
    <Image source={post.image} style={styles.postNFTPhoto} />
  </>
);

Post.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.number.isRequired,
    image: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;
