import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Pressable, StyleSheet, View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackIcon from '@assets/icons/back.svg';

const styles = StyleSheet.create({
  coverImage: {
    width: '100%',
    height: 235,
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
});

const ProfileHeader = ({ coverPictureUrl, profileColor, goBack }) => (
  <View>
    {coverPictureUrl && <Image style={styles.coverImage} source={{ uri: coverPictureUrl }} />}
    {!coverPictureUrl && (
      <LinearGradient
        colors={[profileColor, '#141316']}
        start={[0, 0]}
        end={{ x: 0, y: 1 }}
        style={styles.coverImage}
      />
    )}
    <Pressable style={styles.backIcon} onPress={goBack}>
      <BackIcon width={30} height={30} />
    </Pressable>
  </View>
);

ProfileHeader.defaultProps = {
  coverPictureUrl: null,
};

ProfileHeader.propTypes = {
  coverPictureUrl: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ProfileHeader;
