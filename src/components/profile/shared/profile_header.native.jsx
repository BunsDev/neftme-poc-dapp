import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, StyleSheet, View,
} from 'react-native';
import BackIcon from '@assets/icons/back.svg';

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 154,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
});

const ProfileHeader = ({ coverPictureUrl, goBack }) => (
  <View>
    <Image style={styles.coverImage} source={{ uri: coverPictureUrl }} />
    <Pressable style={styles.backIcon} onPress={goBack}>
      <BackIcon width={30} height={30} />
    </Pressable>
  </View>
);

ProfileHeader.propTypes = {
  coverPictureUrl: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ProfileHeader;
