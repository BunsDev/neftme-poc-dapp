import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { getProfilePictureUrl } from '@services/user';
import styles from './styles';

const logo = require('@assets/logo_home.webp');

const Header = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  useEffect(async () => {
    setProfilePhotoUrl(await getProfilePictureUrl());
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.subHeaderRight}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.subHeaderLeft}>
        {profilePhotoUrl
          ? <Image source={{ uri: profilePhotoUrl }} style={styles.profilePhoto} />
          : <View style={styles.profilePhotoPlaceholder} />}
      </View>
    </View>
  );
};

export default Header;
