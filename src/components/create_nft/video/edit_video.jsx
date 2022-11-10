import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Video } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ExitXIcon from '@assets/icons/exit_x.svg';
import BrushIcon from '@assets/icons/brush_edit_photo.svg';
import CropIcon from '@assets/icons/crop.svg';
import DiscardTrashIcon from '@assets/icons/discard_photo.svg';
import { ImageEditor } from 'expo-image-editor';
import Button from '../../library/button';
import styles from '../image_video_shared/photo_video_styles';

const innerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212b',
  },
  paddingTop60: {
    paddingTop: 60,
  },
  editImageContainer: {
    flex: 1,
    backgroundColor: '#21212b',
    position: 'relative',
  },
  exitContainer: {
    marginTop: 50,
    marginRight: 325,
    alignContent: 'center',
  },
  exitIcon: {
    paddingLeft: 20,
  },
  image: {
    height: 490,
    marginTop: 25,
  },
  editingContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginTop: 10,
    marginLeft: 35,
  },
  editingIcon: {
    padding: 10,
  },
  createNFTButton: {
    fontWeight: '700',
    fontSize: 16,
    alignContent: 'center',
  },
  createNFTButtonContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  mintNFTText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

const EditVideo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedVideo, setSelectedVideo] = useState(route.params.resource);

  const goToNFTDetails = () => {
    if (!selectedVideo) {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: route.params.resource },
      });
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTDetails',
        params: { resource: selectedVideo },
      });
    }
  };

  return (
    <View style={innerStyles.container}>
      <View style={innerStyles.editImageContainer}>
        <Video
          source={{
            uri: route.params.resource,
          }}
          style={innerStyles.image}
        >
          <TouchableOpacity
            style={styles.exitIcon}
            onPress={() => navigation.goBack()}
          >
            <ExitXIcon style={innerStyles.exitIcon} />
          </TouchableOpacity>
        </Video>
        <View style={innerStyles.editingContainer}>
          <TouchableOpacity>
            <BrushIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('ya')}>
            <CropIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <DiscardTrashIcon style={innerStyles.editingContainer} />
          </TouchableOpacity>
        </View>
        <View style={innerStyles.createNFTButtonContainer}>
          <Button
            buttonStyle={innerStyles.createNFTButton}
            onPress={() => goToNFTDetails()}
            text="Mint NFT"
            textStyle={innerStyles.makeOfferText}
          />
        </View>
      </View>
    </View>
  );
};

export default EditVideo;
