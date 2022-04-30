import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import StatsIcon from '@assets/icons/stats.svg';
// Components
import ProfileHeader from '../shared/profile_header';
import ProfileData from '../shared/profile_data';
import NftsList from '../shared/nfts_list';
import EditButton from './edit_button';

const styles = StyleSheet.create({
  myStatsStyle: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  myStatsText: {
    marginLeft: 8,
  },
});

const CreatorProfile = () => {
  const navigation = useNavigation();
  const { data: currentUser } = useGetCurrentUserQuery();

  if (!currentUser) return null;

  return (
    <View>
      <ProfileHeader
        coverImage={currentUser.coverImage}
        profileColor={currentUser.profileColor}
        goBack={navigation.goBack}
      />
      <ProfileData profile={currentUser} ProfileButton={EditButton} />
      <Button
        primary
        buttonStyle={styles.myStatsStyle}
        text="My Stats"
        textStyle={styles.myStatsText}
        Icon={StatsIcon}
        onPress={() => Alert.alert('Available soon')}
      />
      <NftsList nfts={currentUser.nfts} />
    </View>
  );
};

export default withMainScrollView(false, true)(CreatorProfile);
