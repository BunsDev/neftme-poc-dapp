import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { getCreatorProfile } from '@services/creator';
import { Button } from '@library';
import styles from './styles';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import SocialLinks from '../shared/social_links';
import SharedFollowers from './shared_followers';
import Stats from './stats';
import NftsList from '../shared/nfts_list';

const CreatorProfile = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({});
  useEffect(async () => {
    setProfileData(await getCreatorProfile(12));
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
        profilePictureUrl={profileData.profile_photo}
        walletAddress={profileData.wallet_address}
      />
      <SocialLinks />
      <SharedFollowers
        sharedFollowers={profileData.shared_followers}
        totalSharedFollowers={profileData.total_shared_followers}
      />
      <View style={styles.buttonsContainer}>
        <Button text="Follow" style={styles.marginRight18} />
        <Button text="Message" />
      </View>
      <Stats stats={profileData.stats} />
      <NftsList nfts={profileData.nfts} />
    </View>
  );
};

export default withMainScrollView(true, true)(CreatorProfile);
