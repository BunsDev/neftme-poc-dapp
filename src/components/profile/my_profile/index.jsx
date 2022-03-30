import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { getProfileData } from '@services/user';
import { Button } from '@library';
import styles from './styles';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import SocialLinks from '../shared/social_links';
import NftsList from '../shared/nfts_list';

const CreatorProfile = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  useEffect(async () => {
    setProfileData(await getProfileData());
  }, []);

  if (!profileData) return null;

  return (
    <View>
      <ProfileHeader
        coverPictureUrl={profileData.coverImage}
        profileColor={profileData.profileColor}
        goBack={navigation.goBack}
      />
      <ProfileData
        bio={profileData.bio}
        followers={profileData.followers}
        following={profileData.following}
        profileName={profileData.name}
        profilePictureUrl={profileData.profileImage}
        walletAddress={profileData.walletAddress}
        profileColor={profileData.profileColor}
      />
      <SocialLinks />
      <View style={styles.buttonsContainer}>
        <Button
          text="Edit Profile"
          style={styles.marginRight18}
          onPress={() => navigation.navigate('EditProfile', { profileData })}
        />
        <Button text="My Stats" />
      </View>
      <NftsList nfts={profileData.nfts} />
    </View>
  );
};

export default withMainScrollView(false, true)(CreatorProfile);
