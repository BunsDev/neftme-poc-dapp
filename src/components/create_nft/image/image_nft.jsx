import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import PhotoTakeIcon from '@assets/icons/photo_nft_start.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import FlipCamerIcon from '@assets/icons/flip_camera.svg';
import FlashIcon from '@assets/icons/flash.svg';
import TimerIcon from '@assets/icons/timer.svg';
import FilterIcon from '@assets/icons/filters.svg';
import GalleryIcon from '@assets/icons/galery.svg';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 110,
    marginTop: 8,
  },
  stopButton: {
    position: 'absolute',
    marginTop: 25,
  },
  greyRing: {
    marginLeft: 102,
    marginBottom: 100,
  },
  gallery: {
    marginLeft: 50,
    marginBottom: 100,
    alignItems: 'center',
  },
  galleryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  flipCamera: {
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 120,
    marginLeft: 325,
    alignContent: 'center',
  },
  flashCamera: {
    marginTop: 10,
  },
  individualContainerOptions: {
    alignItems: 'center',
    margin: 2,
  },
  flipText: {
    marginTop: 7,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  recordButtonsContainer: {
    alignItems: 'center',
    marginTop: 260,
    marginLeft: 50,
    flexDirection: 'row',
  },
});

const ImageNFT = () => {
  const [nft, setNft] = useState(null);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const navigation = useNavigation();
  const [image, setImage] = useState();

  const takePicture = () => {
    const options = {
      quality: '1080p',
    };

    cameraRef.current.takePictureAsync(options).then((newImage) => {
      setImage(newImage);
    });
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  if (image) {
    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(image.uri).then(() => {
        setImage(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.video} source={{ uri: image.uri }} />
        <Button title="Save" onPress={saveVideo} />
        <Button title="Discard" onPress={() => setImage(undefined)} />
      </SafeAreaView>
    );
  }

  const goToGallery = () => {
    navigation.navigate('CreateNFT', {
      screen: 'ImageGallery',
    });
  };

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      type={type}
      flashMode={flash}
    >
      <View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => toggleCameraType()}
            style={styles.individualContainerOptions}
          >
            <FlipCamerIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleCameraType()}
            style={styles.individualContainerOptions}
          >
            <FilterIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Filter </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFlash()}
            style={styles.individualContainerOptions}
          >
            <TimerIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Timer </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFlash()}
            style={styles.individualContainerOptions}
          >
            <FlashIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Flash </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordButtonsContainer}>
          <TouchableOpacity onPress={() => takePicture()}>
            <PhotoTakeIcon style={styles.buttonContainer} />
            <GreyRingIcon style={styles.greyRing} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gallery}
            onPress={() => goToGallery()}
          >
            <GalleryIcon />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

export default ImageNFT;
