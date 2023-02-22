import React, { useState } from 'react';
import { Modal, Text, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileImage } from '@library';
import BellIcon from '@assets/icons/bell.svg';
import ChallengeIcon from '@assets/icons/challenge_header_icon.svg';
import { useGetCurrentUserQuery } from '@features/current_user';
import styles from './styles';
import NotificationModal from './notification_modal';

const logo = require('@assets/logo_home.webp');

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();

  return (
    <View>
      <View style={styles.centeredView}>
        <NotificationModal isVisible={modalVisible} setIsVisible={setModalVisible}/>
      </View>
      <View style={styles.header}>
        <View style={styles.subHeaderRight}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.subHeaderLeftContainer}>
          <View style={styles.subHeaderLeft}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View>
                <BellIcon style={styles.bellIcon} width={25} height={22} />
                <View style={styles.notificationBadge} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('StartChallenge')}
            >
              <View>
                <ChallengeIcon style={styles.bellIcon} width={35} height={30} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
              {currentUser ? (
                <ProfileImage
                  profileImage={currentUser?.profileImage}
                  containerStyle={{
                    ...styles.profileImageContainer,
                    backgroundColor: currentUser?.profileColor,
                  }}
                  imageStyle={styles.profilePhoto}
                  avatarWidth={30}
                  avatarHeight={30}
                />
              ) : (
                <View style={styles.profilePhotoPlaceholder} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
