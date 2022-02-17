import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  profilePhoto: {
    width: 30.23, height: 30.23, borderRadius: 70, borderWidth: 1, borderColor: '#FFFFFF',
  },
  profile1: {
    left: -9,
  },
  profile2: {
    left: -15,
  },
  flex: {
    flex: 1,
  },
  followedBy: {
    color: '#F8F8F8',
  },
  followersNames: {
    color: '#FCFCFC',
  },
});

const SharedFollowers = ({ sharedFollowers, totalSharedFollowers }) => (
  <View style={styles.container}>
    <View style={styles.flexDirectionRow}>
      {sharedFollowers.map((profile, index) => (
        <Image
          key={`sharedFollowerPicture${profile.name}`}
          style={[styles.profilePhoto, styles[`profile${index}`]]}
          source={{ uri: profile.profile_photo }}
        />
      ))}
    </View>
    <View style={styles.flex}>
      <Text style={styles.followedBy}>Followed by:</Text>
      <Text style={styles.followersNames}>
        {`${sharedFollowers.map((p) => p.name).join(', ')} and ${totalSharedFollowers} others`}
      </Text>
    </View>
  </View>
);

SharedFollowers.propTypes = {
  sharedFollowers: PropTypes.arrayOf(PropTypes.shape({
    profile_photo: PropTypes.string.isRequired,
  })).isRequired,
  totalSharedFollowers: PropTypes.string.isRequired,
};

export default SharedFollowers;
