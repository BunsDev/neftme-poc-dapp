import React, { useEffect, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfilePicture } from '@library';
import { getProfileData } from '@services/user';
import BellIcon from '@assets/icons/bell.svg';
import styles from './styles';

const logo = require('@assets/logo_home.webp');

const Header = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const navigation = useNavigation();

  useEffect(async () => {
    setProfilePhotoUrl((await getProfileData())?.profile_picture);
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
          <Pressable onPress={() => navigation.navigate('MyProfile')}>
            {profilePhotoUrl
              ? (
                <ProfilePicture
                  profilePictureUrl={profilePhotoUrl}
                  pictureStyle={styles.profilePhoto}
                />
              )
              : <View style={styles.profilePhotoPlaceholder} />}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Header;
