import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { ProfileImage, TruncatedText } from '@library';
import ShareIcon from '@assets/icons/share.svg';
import styles from './profile_data_styles';

const ProfileData = ({
  bio, followers, following, name, profileImage, walletAddress, profileColor,
}) => (
  <>
    <View style={styles.container}>
      <ProfileImage
        profileImage={profileImage}
        containerStyle={{ ...styles.profileImageContainer, backgroundColor: profileColor }}
        imageStyle={styles.profileImageStyles}
        avatarWidth={64}
        avatarHeight={64}
      />
      <Text style={styles.name}>{name}</Text>
      {walletAddress && <Text style={styles.wallet}>{`${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}`}</Text>}
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
      {bio ? <TruncatedText text={bio} /> : <Text />}
    </View>
  </>
);

ProfileData.defaultProps = {
  profileImage: '',
  walletAddress: '',
  bio: '',
};

ProfileData.propTypes = {
  bio: PropTypes.string,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  walletAddress: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
};

export default ProfileData;
