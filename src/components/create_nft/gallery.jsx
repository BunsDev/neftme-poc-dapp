import React, { useState } from 'react';
import {
  Dimensions, Image, StyleSheet, View,
} from 'react-native';
import { Gallery } from '@library';
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

  return (
    <View style={styles.container}>
      <Header />
      {selectedImage ? (
        <Image style={styles.selectedImage} source={{ uri: selectedImage.uri }} />
      ) : null}
      <View style={styles.galleryContainer}>
        <Gallery setSelectedImage={setSelectedImage} />
      </View>
    </View>
  );
};

export default ImageGallery;
