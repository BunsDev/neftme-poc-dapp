import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { getProfilePictureUrl } from '@services/user';
import BellIcon from '@assets/icons/bell.svg';
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
      <View style={styles.subHeaderLeftContainer}>
        <View style={styles.subHeaderLeft}>
          <View>
            <BellIcon style={styles.bellIcon} width={25} height={22} />
            <View style={styles.notificationBadge} />
          </View>
          {profilePhotoUrl
            ? <Image source={{ uri: profilePhotoUrl }} style={styles.profilePhoto} />
            : <View style={styles.profilePhotoPlaceholder} />}
        </View>
      </View>
    </View>
  );
};

export default Header;
