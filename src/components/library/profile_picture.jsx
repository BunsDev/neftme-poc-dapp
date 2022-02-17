import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 70,
  },
});

const ProfilePicture = ({ profilePictureUrl, pictureStyle }) => (
  <Image source={{ uri: profilePictureUrl }} style={[styles.profilePicture, pictureStyle]} />
);

ProfilePicture.defaultProps = {
  pictureStyle: {},
};

ProfilePicture.propTypes = {
  profilePictureUrl: PropTypes.string.isRequired,
  pictureStyle: ViewPropTypes.style,
};

export default ProfilePicture;
