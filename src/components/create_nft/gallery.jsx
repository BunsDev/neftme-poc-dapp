import React, { useState } from 'react';
import {
  Dimensions, Image, StyleSheet, View, Text, Button,
} from 'react-native';
import { Gallery } from '@library';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
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

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState('');
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
      allowsEditing: true,
    });
    if (!photo.cancelled && photo.uri) {
      goNext(photo.uri);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );

        setRecording(recording);
      } else {
        setMessage('Please grant permission to app to access microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  const stopRecording = async () => {
    // setRecording(undefined);
    await recording.stopAndUnloadAsync();

    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    sound.setVolumeAsync(1.0);
    updatedRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording
          {index + 1}
          {' '}
          -
          {recordingLine.duration}
        </Text>
        <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play" />
      </View>
    ));
  }

  return (

    <View style={styles.container}>
      <Header showNext onPress={selectedImage ? () => goNext(selectedImage.uri) : null} step={1} />
      {selectedImage ? (
        <Image style={styles.selectedImage} source={{ uri: selectedImage.uri }} />
      ) : null}
      <View style={styles.galleryContainer}>
        <Button onPress={() => startRecording()} title="PLAY"> </Button>
        <Button onPress={() => stopRecording()} title="STOP"> </Button>
        {getRecordingLines()}
      </View>
    </View>

  );
};

export default ImageGallery;
