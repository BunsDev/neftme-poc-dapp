import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import MicrophoneIcon from '@assets/icons/microphone.svg';
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
    alignItems: 'center',
    marginTop: 135,
  },
  videoStartButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 108,
    marginTop: 233,
  },
  greyRing: {
    marginHorizontal: 100,
    marginTop: 225,
  },
  microphone: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 126,
    marginTop: 242,
  },
  stopButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 125,
    marginTop: 250,
  },
});

const AudioNFT = () => {
  const [recordingAudio, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const constants = Constants.manifest.extra;

  const startRecording = async () => {
    try {
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
    } catch (err) {
      // ye
    }
  };

  const downloadAudio = async (filename, uri) => {
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    const downloadedFile = await FileSystem.downloadAsync(uri, fileUri);

    if (downloadedFile.status != 200) {
    }
  };
  const stopRecording = async () => {
    // setRecording(undefined);
    try {
      await recordingAudio.stopAndUnloadAsync();
    } catch (err) {
      console.log(err);
    }

    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const { status } = await recordingAudio.createNewLoadedSoundAsync();
    setIsRecording(false);
    try {
      const nft = new NFTModelClass(
        recordingAudio.getURI(),
        constants.mediaType.audio,
        undefined,
        undefined,
        getDurationFormatted(status.durationMillis),
        undefined
      );

      downloadAudio()

      navigation.navigate('CreateNFT', {
        screen: 'EditAudio',
        params: {
          resource: nft,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  };

  /*
  const streamFromAWS = async () => {
    const b = await getNFTByTokenId(66);

    const source = { uri: b?.resource };
    const initialStatus = {
      shouldPlay: false,
      rate: 1.0,
      volume: 1.0,
    };

    const { sound } = await Audio.Sound.createAsync(source, initialStatus);

    sound.replayAsync();
  };

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <View key={index} style={styles.row}>
        <Text style={styles.fill}>
          Recording
          {index + 1} -{recordingLine.duration}
        </Text>
        <Button
          style={styles.button}
          onPress={() => recordingLine.sound.replayAsync()}
          title="play"
        />
        <Button
          style={styles.button}
          onPress={() => recordingLine.sound.stopAsync()}
          title="Stop"
        />
      </View>
    ));
  } */

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
      </View>
    </View>
  );
};
export default AudioNFT;
