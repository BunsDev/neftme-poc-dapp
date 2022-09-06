import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gallery } from '@library';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from 'expo-image-editor';
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
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [editorVisible, setEditorVisible] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const goNext = (imageUri) => {
    navigation.navigate('CreateNFT', {
      screen: 'CreateNFTDetails',
      params: { nftImage: imageUri, origin: route.params },
    });
  };

  const onCameraPress = async () => {
    const photo = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });
    if (!photo.cancelled && photo.uri) {
      setSelectedImage(photo);
    }
  };

  return (
    <View style={styles.container}>
      {!selectedImage && <Header showNext onPress={null} step={1} />}
      {selectedImage && (
        <ImageEditor
          asView
          visible={editorVisible}
          onCloseEditor={() => {
            setSelectedImage(undefined);
            setEditorVisible(false);
          }}
          imageUri={selectedImage?.uri || undefined}
          fixedCropAspectRatio={1.6}
          lockAspectRatio={false}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            if (result?.uri) {
              setSelectedImage(result.uri);
              goNext(selectedImage.uri);
            }
          }}
          throttleBlur={false}
          mode="crop-only"
        />
      )}
      {!selectedImage && (
        <View style={styles.galleryContainer}>
          <Gallery
            onCameraPress={onCameraPress}
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

export default ImageGallery;
