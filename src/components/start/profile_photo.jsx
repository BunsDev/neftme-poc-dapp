import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { removeData } from '@services/storage';
import { withOnboardingView } from '@hocs';
import styles from './styles';

const ProfilePhoto = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  useEffect(async () => {
    await removeData('newUser');
    if (connector && !connector.connected) {
      navigation.navigate('Home');
    }
  }, [connector]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.startTitle}>Create your first NFT!</Text>
      <Text style={styles.startTitle}>It&apos;s Free!</Text>
      <Text style={styles.startSubTitle}>Upload an image to set your profile photo.</Text>
      <TouchableOpacity>
        <View style={styles.profilePhotoContainer}>
          <Text style={styles.profilePhotoPlaceholder}>Tap to add photo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default withOnboardingView(
  (navigation) => {
    navigation.navigate('Home');
  },
)(ProfilePhoto);
