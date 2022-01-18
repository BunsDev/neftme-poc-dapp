import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Post from './post';

// Mocked data
const profilePhoto = require('@assets/profile_photo.png');
const image = require('@assets/nft_user.png');

const posts = [
  {
    id: 1,
    profilePhoto,
    name: 'Pawel Czerwinski',
    followers: '1.3k',
    image,
  },
];

const Timeline = () => (
  <View style={styles.timelineContainer}>
    {posts.map((p) => <Post key={`post_${p.id}`} post={p} />)}
  </View>
);

export default Timeline;
