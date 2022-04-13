import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  const route = useRoute();
  const [profileData, setProfileData] = useState({});

  useEffect(async () => {
    setProfileData(await getCreatorProfile(route.params.profileUsername));
  }, []);

  if (Object.keys(profileData).length === 0) return null;

  return (
    <View>
      <ProfileHeader
        coverImage={profileData.coverImage}
        profileColor={profileData.profileColor}
        goBack={navigation.goBack}
      />
      <ProfileData
        bio={profileData.bio}
        followers={profileData.followers}
        following={profileData.following}
        name={profileData.name}
        profileImage={profileData.profileImage}
        profileColor={profileData.profileColor}
        walletAddress={profileData.walletAddress}
      />
      <SocialLinks />
      <SharedFollowers
        sharedFollowers={profileData.sharedFollowers}
        totalSharedFollowers={profileData.totalSharedFollowers}
      />
      <View style={styles.buttonsContainer}>
        <Button text="Follow" buttonStyle={styles.followButton} />
        <Button text="Message" primary={false} buttonStyle={styles.messageButton} />
      </View>
      <Stats stats={profileData.stats} />
      <NftsList nfts={profileData.nfts} />
    </View>
  );
};

export default withMainScrollView(false, true)(CreatorProfile);
