import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';

const logo = require('@assets/logo_home.webp');
const profilePhoto = require('@assets/profile_photo.png');

const Header = () => (
  <View style={styles.header}>
    <View style={styles.subHeaderRight}>
      <Image source={logo} style={styles.logo} />
    </View>
    <View style={styles.subHeaderLeft}>
      <Image source={profilePhoto} style={styles.profilePhoto} />
    </View>
  </View>
);

export default Header;
