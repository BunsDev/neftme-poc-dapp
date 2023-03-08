import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import VideoStartIcon from '@assets/icons/video_start.svg';
import VideoStopIcon from '@assets/icons/stop_video_nft.svg';
import GreyRingIcon from '@assets/icons/video_photo_nft_grey_ring.svg';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import styles from '../image_video_shared/photo_video_styles';
import CameraOptions from '../image_video_shared/camera_options';
import Challenge from '../../../../model/challenge_model';

const VideoChallenge = ({ challenge }) => {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const navigation = useNavigation();
  const constants = Constants.expoConfig.extra;

  const requestPermissions = async () => {
    await Camera.requestCameraPermissionsAsync();
    await Camera.requestMicrophonePermissionsAsync();
  };
  useEffect(() => {
    requestPermissions();
  });

  const recordVideo = () => {
    setIsRecording(true);
    const options = {
      quality: '1080p',
      maxDuration: 300,
      mute: false,
    };

    cameraRef?.current?.recordAsync(options).then((recordedVideo) => {
      // TODO Change mov file to mp4 | Web says it's just an extension change. Doesnt work with expo av video component
      // const uri = `${recordedVideo?.uri.split('.')[0]}.mp4`;
      // const newRecordedVideo = { uri };
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef?.current?.stopRecording();
  };

  if (video) {
    challenge.setChallengeResource(video?.uri);
    challenge.setChallengeResourceType(constants.mediaType.video);
    navigation.navigate('FinalizeChallenge', { challenge });
    /* if this set is not present, if you take a picture,
       discard it and come back to the camera screen, when making any action (changing camera, flash)
       it will return to the editing screen
    */
    setVideo(undefined);
  }

  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      type={type}
      flashMode={flash}
    >
      <View>
        <CameraOptions flash={flash} setFlash={setFlash} setType={setType} />
        <View style={styles.recordButtonsContainer}>
          <TouchableOpacity onPress={isRecording ? stopRecording : recordVideo}>
            {isRecording ? (
              <VideoStopIcon style={styles.stopButton} />
            ) : (
              <VideoStartIcon style={styles.buttonContainer} />
            )}
            <GreyRingIcon style={styles.greyRing} />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
};

VideoChallenge.propTypes = {
  challenge: PropTypes.shape(Challenge).isRequired,
};

export default VideoChallenge;
