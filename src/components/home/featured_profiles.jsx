import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import ProfileCard from './profile_card';

// Mocked data
const header = require('@assets/prof_header.png');
const profilePhoto = require('@assets/profile_photo.png');

const profiles = [
  {
    id: 1,
    name: 'Savannah Nguy',
    followers: '23k',
    header,
    profilePhoto,
  },
  {
    id: 2,
    name: 'Guy Hawkins',
    followers: '1.3k',
    header,
    profilePhoto,
  },
  {
    id: 3,
    name: 'John Doe',
    followers: '432k',
    header,
    profilePhoto,
  },
];

const FeaturedProfiles = () => (
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
      {profiles.map((p) => <ProfileCard key={p.id} profile={p} />)}
    </View>
  </>
);

export default FeaturedProfiles;
