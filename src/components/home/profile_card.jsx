import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import styles from './styles';

const ProfileCard = ({ profile }) => (
  <View style={styles.profileItem}>
    <Image source={{ uri: profile.header }} style={styles.profileItemHeaderImage} />
    <Text style={styles.profileItemName}>{profile.name}</Text>
    <Text style={styles.profileItemFollowers}>{`${profile.followers} Followers`}</Text>
    <Image source={{ uri: profile.profilePhoto }} style={styles.profileItemUserPhoto} />
  </View>
);

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    header: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
