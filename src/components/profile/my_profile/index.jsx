import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { getProfileData } from '@services/user';
import styles from './styles';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import SocialLinks from '../shared/social_links';
import ProfileButton from '../shared/button';
import NftsList from '../shared/nfts_list';

const CreatorProfile = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({});
  useEffect(async () => {
    setProfileData(await getProfileData());
  }, []);

  if (Object.keys(profileData).length === 0) return null;

  return (
    <View>
      <ProfileHeader coverPictureUrl={profileData.cover_photo} goBack={navigation.goBack} />
      <ProfileData
        bio={profileData.bio}
        followers={profileData.followers}
        following={profileData.following}
        profileName={profileData.name}
        profilePictureUrl={profileData.profile_picture}
        walletAddress={profileData.wallet_address}
      />
      <SocialLinks />
      <View style={styles.buttonsContainer}>
        <ProfileButton text="Edit Profile" style={styles.marginRight18} />
        <ProfileButton text="My Stats" />
      </View>
      <NftsList nfts={profileData.nfts} />
    </View>
  );
};

export default withMainScrollView(CreatorProfile);
