import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import styles from './styles';

const ProfileCard = ({ profile }) => (
  <View style={styles.profileItem}>
    <Image source={profile.header} style={styles.profileItemHeaderImage} />
    <Text style={styles.profileItemName}>{profile.name}</Text>
    <Text style={styles.profileItemFollowers}>{`${profile.followers} Followers`}</Text>
    <Image source={profile.profilePhoto} style={styles.profileItemUserPhoto} />
  </View>
);

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    header: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfileCard;
