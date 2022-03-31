import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraIcon from '@assets/icons/camera_yellow.svg';

const styles = StyleSheet.create({
  chip: {
    width: 103,
    height: 103,
    backgroundColor: '#41414A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  text: {
    marginTop: 8,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

const Camera = () => (
  <View style={styles.chip}>
    <CameraIcon width={34.7} height={27.8} />
    <Text style={styles.text}>Take Photo</Text>
  </View>
);

export default Camera;
