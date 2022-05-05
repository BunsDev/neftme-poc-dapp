import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCreatorProfile } from '@services/creator';
import { followUser, unfollowUser } from '@services/user';
import { Button, Loading } from '@library';
import styles from './styles';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import SharedFollowers from './shared_followers';
import Stats from './stats';
import NftsList from '../shared/nfts_list';
import ShareButton from './share_button';

const CreatorProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setProfileData(await getCreatorProfile(route.params.profileId));
  }, []);

  if (Object.keys(profileData).length === 0) return null;

  const onFollow = async () => {
    setIsLoading(true);
    const res = profileData.isCurrentUserFollowing
      ? await unfollowUser(profileData.id) : await followUser(profileData.id);
    if (res) {
      // TODO: When in redux store, Invalidate cache of user id profile (creator and featured profile)
      // dispatch(api.util.updateQueryData('getPosts'));
      setProfileData(await getCreatorProfile(profileData.id));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert('Something went wrong, please try again');
    }
  };

  return (
    <View>
      {isLoading && <Loading />}
      <ProfileHeader
        coverImage={profileData.coverImage}
        profileColor={profileData.profileColor}
        goBack={navigation.goBack}
      />
      <ProfileData profile={profileData} ProfileButton={ShareButton} />
      <SharedFollowers
        sharedFollowers={profileData.sharedFollowers}
        totalSharedFollowers={profileData.totalSharedFollowers}
      />
      <View style={styles.buttonsContainer}>
        <Button text={profileData.isCurrentUserFollowing ? 'Unfollow' : 'Follow'} buttonStyle={styles.followButton} onPress={onFollow} />
        <Button text="Message" primary={false} buttonStyle={styles.messageButton} onPress={() => Alert.alert('Available soon')} />
      </View>
      <Stats stats={profileData.stats} />
      <NftsList nfts={profileData.nfts} />
    </View>
  );
};

export default withMainScrollView(false, true)(CreatorProfile);
