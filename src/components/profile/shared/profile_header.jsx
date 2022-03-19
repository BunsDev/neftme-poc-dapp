import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, StyleSheet, View,
} from 'react-native';

const backIcon = require('@assets/icons_web/back.png');

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
      <Image source={backIcon} style={{ width: 30, height: 30 }} />
    </Pressable>
  </View>
);

ProfileHeader.propTypes = {
  coverPictureUrl: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ProfileHeader;
