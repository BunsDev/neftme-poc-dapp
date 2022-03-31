import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Linking, ScrollView, StyleSheet, View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ImageTile from './image';
import SelectMore from './select_more';
import Camera from './camera';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const Gallery = ({ setSelectedImage }) => {
  const [cameraRollStatus, setCameraRollStatus] = useState({});
  const [images, setImages] = useState([]);

  const getPermissionsAsync = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setCameraRollStatus(status);
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      Alert.alert(
        'Permissions error',
        "NEFTME doesn't have access to your Camera Roll. Please go to the Settings page and update these settings",
        [
          { text: 'OK', onPress: () => { } },
          { text: 'Settings', onPress: () => Linking.openURL('app-settings:') }, // TODO: WE NEED TO ADD ANDROID LINKING (https://medium.com/toprakio/react-native-how-to-open-app-settings-page-d30d918a7f55);
        ],
      );
    }
  };

  const getImages = () => {
    const params = {
      mediaType: [MediaLibrary.MediaType.photo],
      sortBy: [MediaLibrary.SortBy.creationTime],
    };
    MediaLibrary
      .getAssetsAsync(params)
      .then((data) => setImages(data.assets));
  };

  useEffect(async () => {
    await getPermissionsAsync();
    MediaLibrary.addListener((event) => {
      if (event?.hasIncrementalChanges === 0) {
        getImages();
      }
    });
    getImages();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Camera />
        {images.map((i) => <ImageTile key={`img_${i.id}`} image={i} onPress={setSelectedImage} />)}
        {cameraRollStatus?.accessPrivileges === 'limited' ? (
          <SelectMore onPress={MediaLibrary.presentPermissionsPickerAsync} />
        ) : null}
      </View>
    </ScrollView>
  );
};

Gallery.propTypes = {
  setSelectedImage: PropTypes.func.isRequired,
};

export default Gallery;
