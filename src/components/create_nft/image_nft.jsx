import React, { useState, useRef, useEffect } from 'react';
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
  galleryIcon: {
    marginBottom: 50,
  },
  galleryText: {
    marginBottom: 100,
    color: '#FFFFFF',
  },
  greyRing: {
    marginHorizontal: 102,
    marginBottom: 100,
  },
  flipCamera: {
    marginLeft: 320,
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 100,
  },
  flashCamera: {
    marginLeft: 325,
    marginTop: 10,
  },
  flipText: {
    marginLeft: 320,
    marginTop: 5,
    color: '#FFFFFF',
  },
  recordButtonsContainer: {
    alignItems: 'center',
    marginTop: 300,
    flexDirection: 'row',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const ImageNFT = () => {
  const [nft, setNft] = useState(null);
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
    })();
  }, []);

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
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined}
        <Button title="Discard" onPress={() => setImage(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      type={type}
      flashMode={flash}
    >
      <View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => toggleCameraType()}>
            <FlipCamerIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleCameraType()}>
            <FilterIcon style={styles.flipCamera} />
            <Text style={styles.flipText}> Filter </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFlash()}>
            <TimerIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Timer </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFlash()}>
            <FlashIcon style={styles.flashCamera} />
            <Text style={styles.flipText}> Flash </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recordButtonsContainer}>
          <TouchableOpacity onPress={() => takePicture()}>
            <PhotoTakeIcon style={styles.buttonContainer} />
            <GreyRingIcon style={styles.greyRing} />
          </TouchableOpacity>
          <View style={styles.galleryIcon}>
            <TouchableOpacity onPress={() => takePicture()}>
              <GalleryIcon style={styles.galleryIcon} />
              <Text style={styles.galleryText}> Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Camera>
  );
};

export default ImageNFT;
