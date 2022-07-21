import React, { useState } from 'react';
import {
  Dimensions, StyleSheet,
  Button, Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { ImageEditor } from 'expo-image-editor';
import { SafeAreaView } from 'react-native-safe-area-context';

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
});

const EditImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorVisible, setEditorVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const goNext = (imageUri) => {
    navigation.navigate('CreateNFT', {
      screen: 'CreateNFTDetails',
      params: { nftImage: imageUri, origin: route.params },
    });
  };
  console.log('aloe loaslod asd');
  console.log(route.params.image);

  const onDone = (newImageUri) => {
    setSelectedImage(newImageUri);
    setEditorVisible(false);
    goNext(selectedImage);
  };

  const onBack = () => {
    setEditorVisible(false);
  };

  return editorVisible ? (
    <RecoilRoot>
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ImageEditor
          visible={editorVisible}
          onCloseEditor={() => setEditorVisible(false)}
          imageUri={route.params.image}
          fixedCropAspectRatio={16 / 9}
          lockAspectRatio
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => {
            onDone(result);
          }}
          mode="full"
        />
      </SafeAreaView>
    </RecoilRoot>
  ) : (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image style={{ width: 300, height: 300 }} source={{ uri: route.params.image }} />
      <Button onPress={() => setEditorVisible(true)} title="Edit" />
    </SafeAreaView>
  );
};

export default EditImage;
