import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { removeData } from '@services/storage';
import { getProfileData, updateProfileData } from '@services/user';
import { Button, Loading } from '@library';
import { useSmartContract } from '@hooks';
import { withOnboardingView } from '@hocs';
import { mintNFT } from '@services/nft';
import Constants from 'expo-constants';
import styles from './styles';

const ProfilePhoto = () => {
  const connector = useWalletConnect();
  const navigation = useNavigation();
  const route = useRoute();
  const { getContractMethods } = useSmartContract();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const profileData = await getProfileData();
    if (profileData?.profileImage) {
      setProfilePhoto(profileData.profileImage);
    }
    setIsLoading(false);
  }, []);

  useEffect(async () => {
    await removeData('newUser');
    if (connector && !connector.connected) {
      navigation.navigate('Home');
    }
  }, [connector]);

  useEffect(() => {
    if (route?.params?.nft?.image) {
      setProfilePhoto(route.params.nft.image);
    }
  }, [route]);

  const onUploadPhotoPress = () => {
    navigation.navigate('CreateNFT', {
      screen: 'Gallery',
      params: {
        returnTo: 'startProfilePhoto',
        profilePhoto: true,
      },
    });
  };

  const onSetPress = async () => {
    try {
      setIsLoading(true);
      const nft = {
        title: route?.params?.nft?.title || 'My Profile Photo',
        description: route?.params?.nft?.description || 'My Profile Photo',
        price: 0,
        communityPercentage: 0,
        image: profilePhoto,
      };
      const contractMethods = await getContractMethods(
        Constants.manifest.extra.neftmeErc721Address,
      );
      const mintedNFT = await mintNFT(contractMethods, nft, connector.accounts[0]);
      if (mintedNFT?.success === true) {
        const response = await updateProfileData({
          profileImage: mintedNFT.url,
        });
        setIsLoading(false);
        if (response) {
          Alert.alert('Success', 'Your first NFT was minted successfully!', [
            { text: 'Discover NEFTME', onPress: () => navigation.navigate('Home') },
          ]);
        } else {
          Alert.alert('Error', "Your NFT was minted successfully but we couldn't set it as Profile Photo");
        }
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again');
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.startTitle}>Create your first NFT!</Text>
      <Text style={styles.startTitle}>It&apos;s Free!</Text>
      <Text style={styles.startSubTitle}>Upload an image to set your profile photo.</Text>
      <TouchableOpacity onPress={onUploadPhotoPress}>
        <View style={[styles.profilePhotoSize, styles.profilePhotoContainer]}>
          {profilePhoto ? <Image source={{ uri: profilePhoto }} style={styles.profilePhotoSize} />
            : <Text style={styles.profilePhotoPlaceholder}>Tap to add photo</Text>}
        </View>
      </TouchableOpacity>
      <Button
        text="Set as profile photo"
        buttonStyle={styles.setProfilePhotoButton}
        primary={!!profilePhoto}
        onPress={profilePhoto ? onSetPress : () => { }}
      />
      <Loading visible={isLoading} />
    </View>
  );
};

export default withOnboardingView(
  (navigation) => {
    navigation.navigate('Home');
  },
)(ProfilePhoto);
