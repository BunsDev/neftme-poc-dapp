import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { withMainScrollView } from '@hocs';
import { useNavigation } from '@react-navigation/native';
import { useGetCurrentUserQuery } from '@features/current_user';
import { Button } from '@library';
import { getCreatedNfts, getOwnedNfts } from '@services/user_nfts';
import { useSmartContract } from '@hooks';
import Constants from 'expo-constants';
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
  const { getContractMethods } = useSmartContract();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [nftsData, setNftsData] = useState({
    created: [],
    owned: [],
    supporting: [],
    saved: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.walletAddress) {
        const contractMethods = await getContractMethods(
          Constants.manifest.extra.neftmeViewContractAddress,
        );
        getCreatedNfts(contractMethods, currentUser.walletAddress)
          .then((created) => setNftsData((prevData) => ({
            ...prevData,
            created,
          })));
        getOwnedNfts(contractMethods, currentUser.walletAddress)
          .then((owned) => setNftsData((prevData) => ({
            ...prevData,
            owned,
          })));
      }
    };
    fetchData();
  }, []);

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
      <NftsList nfts={nftsData} myProfile />
    </View>
  );
};

export default withMainScrollView(false, true)(CreatorProfile);
