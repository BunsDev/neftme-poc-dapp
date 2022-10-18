import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gallery } from '@library';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImageEditor } from 'expo-image-editor';
import Header from '../header';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
  },
  paddingTop60: {
    paddingTop: 60,
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

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
});

const NftVideoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [editorVisible, setEditorVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View
      style={
        editorVisible
          ? [styles.container]
          : [styles.container, styles.paddingTop60]
      }
    >
      {!selectedImage && <Header showNext onPress={null} step={1} />}
      {!selectedImage && (
        <View style={styles.galleryContainer}>
          <Gallery
            setSelectedImage={(image) => {
              setSelectedImage(image);
              setEditorVisible(true);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default NftVideoGallery;
