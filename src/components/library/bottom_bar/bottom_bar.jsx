import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '@assets/icons/home.svg';
import CreateIcon from '@assets/icons/create_nft.svg';
import SearchIcon from '@assets/icons/search.svg';
import BellIcon from '@assets/icons/bell.svg';
import { ProfileImage } from '@library';
import { useGetCurrentUserQuery } from '@features/current_user';
import NotificationModal from './notification_modal';

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    height: 78,
    backgroundColor: '#313141',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  createNftIcon: {
    marginHorizontal: 75,
  },
  profileImageContainer: {
    width: 25,
    height: 25,
  },
  profilePhoto: {
    width: 40,
    height: 40,
  },
});

const BottomBar = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery();

  return (
    <View style={styles.bottomBar}>
      <NotificationModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <HomeIcon width={25} height={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <SearchIcon width={25} height={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateNFT')}>
        <CreateIcon width={45} height={45} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <BellIcon width={25} height={25} />
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
            avatarWidth={25}
            avatarHeight={25}
          />
        ) : (
          <View style={styles.profilePhotoPlaceholder} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
