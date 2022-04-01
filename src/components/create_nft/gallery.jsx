import React, { useState } from 'react';
import {
  Dimensions, Image, StyleSheet, View,
} from 'react-native';
import { Gallery } from '@library';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Header from './header';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#21212b',
  },
  chip: {
    width: 103,
    height: 103,
    flexGrow: 1,
  },
  selectedImage: {
    marginTop: 26,
    marginBottom: 8,
    marginHorizontal: 16,
    width: width - 32,
    height: width - 32,
  },
  galleryContainer: {
    marginVertical: 18,
    marginHorizontal: 8,
  },
});

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const goNext = (imageUri) => navigation.navigate('CreateNFT', { screen: 'CreateNFTDetails', params: { nftImage: imageUri } });

  const onCameraPress = async () => {
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    if (!photo.cancelled && photo.uri) {
      goNext(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header showNext onPress={selectedImage ? () => goNext(selectedImage.uri) : null} step={1} />
      {selectedImage ? (
        <Image style={styles.selectedImage} source={{ uri: selectedImage.uri }} />
      ) : null}
      <View style={styles.galleryContainer}>
        <Gallery onCameraPress={onCameraPress} setSelectedImage={setSelectedImage} />
      </View>
    </View>
  );
};

export default ImageGallery;
