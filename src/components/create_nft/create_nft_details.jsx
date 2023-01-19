import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import * as Device from 'expo-device';
import { InputField } from '@library';
import LocationIcon from '@assets/icons/add_location.svg';
import Constants from 'expo-constants';
import Header from './header';
import { NFTModelClass } from '../../model/nft_model';

const audioImage = require('@assets/audio_default_image.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  paddingTop16: {
    paddingTop: 16,
  },
  marginTop16: {
    marginTop: 16,
  },
  addLocation: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  locationText: {
    color: 'rgba(246, 193, 56, 1)',
    fontWeight: '500',
    fontSize: 15,
  },
});

const CreateNFTDetails = () => {
  const route = useRoute();
  const constants = Constants.manifest.extra;
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(undefined);

  const onNextPress = () => {
    if (route.params.origin?.profilePhoto) {
      if (route.params.origin?.returnTo === 'startProfilePhoto') {
        navigation.navigate('Start', {
          screen: 'ProfilePhoto',
          params: {
            nft: {
              resource: route.params.nftImage,
              description,
            },
          },
        });
      } else if (route.params.origin?.returnTo === 'editProfilePhoto') {
        navigation.navigate('EditProfile', {
          type: route.params.origin?.type,
          nft: {
            resource: route.params.nftImage,
            description,
          },
        });
      }
    } else {
      const nft = new NFTModelClass(
        route.params?.resource,
        route.params?.resourceType,
        location,
        description
      );
      switch (route.params.resourceType) {
        case constants.mediaType.video:
          nft.setExtraResource(route.params?.videoImage?.uri);
          break;
        case constants.mediaType.image:
          nft.setExtraResource(null);
          break;
        case constants.mediaType.audio:
          nft.setExtraResource(route.params.duration);
      }

      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTTokenomics',
        params: {
          nft,
        },
      });
    }
  };

  const navigateToLocation = () => {
    navigation.navigate('CreateNFT', {
      screen: 'LocationNFT',
    });
  };

  const returnImageOnType = () => {
    switch (route.params.resourceType) {
      case constants.mediaType.video:
        return route.params.videoImage.uri;
      case constants.mediaType.image:
        return route.params.resource;
      case constants.mediaType.audio:
        return audioImage;
    }
  };

  return (
    <View style={styles.container}>
      <Header showNext onPress={onNextPress} step={2} />
      <View style={styles.formContainer}>
        <InputField
          labelName="Description"
          value={description}
          resource={returnImageOnType()}
          onFieldChange={setDescription}
          inputPlaceholder="Describe your NFT, add hashtags or mention other Creators"
          multiline
          numberOfLines={Device.modelName === 'ios' ? null : 10}
          minHeight={Device.modelName === 'ios' ? 200 : null}
          inputStyle={styles.paddingTop16}
          containerStyle={styles.marginTop16}
        />
      </View>
      <TouchableOpacity
        style={styles.addLocation}
        onPress={() => navigateToLocation()}
      >
        {location ? (
          <Text style={styles.locationText}>{location}</Text>
        ) : (
          <>
            <Text style={styles.locationText}>Add location </Text>
            <LocationIcon style={styles.arrowIcon} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateNFTDetails;
