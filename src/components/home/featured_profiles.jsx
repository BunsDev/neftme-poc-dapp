import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, FlatList, Text, View,
} from 'react-native';
import { getFeaturedProfiles } from '@services/user';
import styles from './styles';
import ProfileCard from './profile_card';

const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(async () => {
    setProfiles(await getFeaturedProfiles());
  }, []);

  return (
    <>
      <View style={styles.trendingContainer}>
        <View style={styles.header}>
          <View style={styles.subHeaderRight}>
            <Text style={styles.trendingTitle}>Trending</Text>
          </View>
          <View style={styles.subHeaderLeft}>
            <Text style={styles.seeAllText}>See All</Text>
          </View>
        </View>
      </View>
      <View style={styles.profilesList}>
        {profiles.length === 0
          ? (
            <View style={styles.profilesListPlaceholder}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )
          : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={profiles}
              renderItem={({ item, index }) => (
                <ProfileCard key={item.id} profile={item} index={index} />
              )}
            />
          )}
      </View>
    </>
  );
};

export default FeaturedProfiles;
