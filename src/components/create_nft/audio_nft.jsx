import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import MicrophoneIcon from '@assets/icons/microphone.svg';
import { CountUp } from 'use-count-up';
import { postAPINFT } from '../../services/nft';
import { getNFTByTokenId } from '../../features/neftme_api/nft';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 242,
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  recordButtonsContainer: {
    alignItems: 'center',
    marginTop: 350,
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 110,
    marginTop: 8,
  },
  greyRing: {
    marginHorizontal: 102,
    marginBottom: 100,
  },
  microphone: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 128,
    marginTop: 17,
  },
  stopButton: {
    position: 'absolute',
    alignItems: 'center',
    marginHorizontal: 127,
    marginTop: 25,
  },
});

const AudioNFT = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [counter, setCounter] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [nft, setNft] = useState(null);

  useEffect(() => {
    const timer =
      counter > 0 && setTimeout(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const padTime = (time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = (time) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    // Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  const goNext = (resourceURI) => {
    navigation.navigate('CreateNFT', {
      screen: 'CreateNFTDetails',
      params: { resource: resourceURI, origin: route.params },
    });
  };

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
        setCounter(1);
        setRecording(recording);
      }
    } catch (err) {
      // ye
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
    setIsRecording(false);

    // This setting is needed because otherwise the IOS system
    // will only play sound via the phone call speaker, and not the bottom ones
    // Big thanks to that guy on Github with the same issue
    Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    updatedRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    /*
    updatedRecordings.push({
      sound,
      duration: 20,
      file: 'https://neftme-test-bucket.s3.eu-west-2.amazonaws.com/sample3.m4a',
    }); */

    const communityPercentage = 10;
    const tempNFT = {
      description: 'descricao',
      communityPercentage,
      resource: recording.getURI(),
      resource_type: 'm4a',
    };

    setNft(tempNFT);
    setRecordings(updatedRecordings);
  };

  const upload = async () => {
    if (nft != null) {
      await postAPINFT(nft);
    }
  };

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
  }

  return (
    <View style={styles.container}>
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
      <View style={styles.recordButtonsContainer}>
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <VideoStopIcon style={styles.stopButton} />
          ) : (
            <>
              <VideoStartIcon style={styles.buttonContainer} />
              <MicrophoneIcon style={styles.microphone} />
            </>
          )}
          <GreyRingIcon style={styles.greyRing} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // CENAS DE RECORDING SONS
  /*
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


    {/* <TouchableOpacity onPress={() => setCounter(1)}>
          <Text style={styles.text}>
            {counter === 15 ? (
              'Max time reached!'
            ) : (
              <Text>Counter {format(counter)} </Text>
            )}
          </Text>
        </TouchableOpacity> */
};

export default AudioNFT;
