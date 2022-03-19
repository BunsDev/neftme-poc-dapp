import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { ProfilePicture, TruncatedText } from '@library';
import ShareIcon from '@assets/icons/share.svg';
import styles from './profile_data_styles';

const ProfileData = ({
  bio, followers, following, profileName, profilePictureUrl, walletAddress,
}) => (
  <>
    <View style={styles.container}>
      <ProfilePicture profilePictureUrl={profilePictureUrl} pictureStyle={styles.profilePicture} />
      <Text style={styles.name}>{profileName}</Text>
      <Text style={styles.wallet}>{`${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`}</Text>
    </View>
    <View style={styles.socialContainer}>
      <View style={styles.followsContainer}>
        <View style={styles.followers}>
          <Text style={styles.totalFollow}>{followers}</Text>
          <Text style={styles.followLabel}>followers</Text>
        </View>
        <View style={styles.following}>
          <Text style={styles.totalFollow}>{following}</Text>
          <Text style={styles.followLabel}>following</Text>
        </View>
      </View>
      <View style={styles.shareContainer}>
        <ShareIcon width={20} height={18} />
        <Text style={styles.shareText}>Share</Text>
      </View>
    </View>
    <View style={styles.bioContainer}>
      <Text style={styles.bioText}>Bio</Text>
      <TruncatedText text={bio} />
    </View>
  </>
);

ProfileData.propTypes = {
  bio: PropTypes.string.isRequired,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string.isRequired,
  walletAddress: PropTypes.string.isRequired,
};

export default ProfileData;
