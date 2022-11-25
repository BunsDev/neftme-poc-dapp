import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import MicrophoneIcon from '@assets/icons/microphone.svg';
import SmallMicrophoneIcon from '@assets/icons/small_microphone.svg';
import { CountUp } from 'use-count-up';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { format, getDurationFormatted } from '../../../utils/time';
import { NFTModelClass } from '../../../model/nft_model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 50,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  recordingText: {
    marginTop: 30,
    fontSize: 25,
    lineHeight: 25,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 1)',
  },
  recordButtonsContainer: {
    marginTop: 235,
    height: 200,
  },
  videoStartButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 108,
    marginTop: 128,
  },
  greyRing: {
    marginHorizontal: 100,
    marginTop: 120,
  },
  microphone: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 126,
    marginTop: 135,
  },
  stopButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 125,
    marginTop: 145,
  },
  galleryAudios: {
    position: 'absolute',
    marginLeft: 220,
    marginTop: 140,
  },
  galleryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlignVertical: 'center',
  },
  smallMicrophone: {
    alignSelf: 'center',
  },
});

const AudioNFT = () => {
  const [recordingAudio, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  const constants = Constants.manifest.extra;
  const audioDir =
    FileSystem.documentDirectory + Constants.manifest.extra.localAudioDirectory;

  // TODO Colocar funções na pasta utils e importar

  const navigateToEditAudio = (nft) => {
    if (nft) {
      navigation.navigate('CreateNFT', {
        screen: 'EditAudio',
        params: {
          nft,
        },
      });
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'EditAudio',
        params: {},
      });
    }
  };

  const startRecording = async () => {
    try {
      const dirContent = await FileSystem.readDirectoryAsync(audioDir);
      if (dirContent.length >= 10) {
        Alert.alert(
          'Sorry, you have reached the maximum number of audios! Please delete at least 1 to record again'
        );
      } else {
        const permission = await Audio.requestPermissionsAsync();

        if (permission.status === 'granted') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          setIsRecording(true);

          const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          setRecording(recording);
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const downloadAudioToLocalStorage = async (fileURI) => {
    // Checks if Audio Dir exists
    const read = await FileSystem.getInfoAsync(audioDir);

    if (!read.exists || !read.isDirectory) {
      // If dir !exists or is not marked as Dir, create it
      try {
        await FileSystem.makeDirectoryAsync(audioDir);
      } catch (err) {
        // console.log(err);
      }
    }

    try {
      const { exists } = await FileSystem.getInfoAsync(fileURI);
      const { isDirectory } = await FileSystem.getInfoAsync(audioDir);

      if (exists && isDirectory) {
        const dirContent = await FileSystem.readDirectoryAsync(audioDir);
        const filePath = `${audioDir}NewRecording${dirContent.length + 1}`;

        await FileSystem.moveAsync({
          from: fileURI,
          to: filePath,
        });
        return filePath;
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const stopRecording = async () => {
    // setRecording(undefined);
    try {
      await recordingAudio.stopAndUnloadAsync();
    } catch (err) {
      console.log(err);
    }
    setIsRecording(false);

    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const { status } = await recordingAudio.createNewLoadedSoundAsync();
    const localURI = await downloadAudioToLocalStorage(recordingAudio.getURI());

    try {
      const nft = new NFTModelClass(
        localURI,
        constants.mediaType.audio,
        undefined,
        undefined,
        getDurationFormatted(status.durationMillis),
        undefined
      );

      navigateToEditAudio(nft);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.recordingText}>New Recording</Text>
      </View>
      <View>
        <Text style={styles.text}>
          <CountUp
            isCounting={isRecording}
            start={0}
            end={120}
            duration={120}
            easing="linear"
            updateInterval={1}
            formatter={(value) => format(value.toLocaleString())}
          />
        </Text>
      </View>
      <View style={styles.recordButtonsContainer}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <VideoStopIcon style={styles.stopButton} />
          ) : (
            <>
              <VideoStartIcon style={styles.videoStartButton} />
              <MicrophoneIcon style={styles.microphone} />
            </>
          )}
          <GreyRingIcon style={styles.greyRing} />
        </TouchableOpacity>
        <View style={styles.galleryAudios}>
          <TouchableOpacity onPress={() => navigateToEditAudio()}>
            <SmallMicrophoneIcon style={styles.smallMicrophone} />
            <Text style={styles.galleryText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default AudioNFT;
