import React from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const ProfileCard = ({ profile }) => {
  const navigation = useNavigation();
  const navigateToProfile = () => navigation.navigate('CreatorProfile', { profileId: profile.id });

  return (
    <Pressable style={styles.profileItem} onPress={navigateToProfile}>
      <Image source={{ uri: profile.header }} style={styles.profileItemHeaderImage} />
      <Text style={styles.profileItemName}>{profile.name}</Text>
      <Text style={styles.profileItemFollowers}>{`${profile.followers} Followers`}</Text>
      <Image source={{ uri: profile.profilePhoto }} style={styles.profileItemUserPhoto} />
    </Pressable>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    header: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    followers: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
