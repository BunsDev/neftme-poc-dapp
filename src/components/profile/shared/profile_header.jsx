import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import BackIcon from '@assets/icons/back.svg';
import { CoverImage } from '@library';

const styles = StyleSheet.create({
  coverImageWrapper: {
    width: '100%',
    height: 235,
  },
  coverImage: {
    width: '100%',
    height: 235,
  },
  coverImageGradient: {
    height: '100%',
  },
  backIcon: {
    position: 'absolute',
    left: 16,
    top: 60,
  },
});

const ProfileHeader = ({ coverImage, profileColor, goBack }) => (
  <View>
    <CoverImage
      coverImage={coverImage}
      coverImageWrapperStyle={styles.coverImageWrapper}
      coverImageStyle={styles.coverImage}
      coverGradientStyle={styles.coverImageGradient}
      profileColor={profileColor}
      bottomCoverColor="#141316"
    />
    <Pressable style={styles.backIcon} onPress={goBack}>
      <BackIcon width={30} height={30} />
    </Pressable>
  </View>
);

ProfileHeader.defaultProps = {
  coverImage: '',
};

ProfileHeader.propTypes = {
  coverImage: PropTypes.string,
  profileColor: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default ProfileHeader;
