import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Platform, ScrollView, StyleSheet, View,
} from 'react-native';
import { InputField } from '@library';
import Header from './header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#21212b',
  },
  formContainer: {
    marginHorizontal: 16,
    marginBottom: 40,
  },
  paddingTop16: {
    paddingTop: 16,
  },
  marginTop16: {
    marginTop: 16,
  },
});

const CreateNFTDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const onNextPress = () => {
    if (route.params.origin?.profilePhoto) {
      if (route.params.origin?.returnTo === 'startProfilePhoto') {
        navigation.navigate('Start', {
          screen: 'ProfilePhoto',
          params: {
            nft: {
              image: route.params.nftImage,
              title,
              description,
            },
          },
        });
      }
    } else {
      navigation.navigate('CreateNFT', {
        screen: 'CreateNFTTokenomics',
        params: {
          nft: {
            image: route.params.nftImage,
            title,
            description,
          },
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header showNext onPress={title && description ? onNextPress : null} step={2} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <InputField
            labelName="Title"
            value={title}
            onFieldChange={setTitle}
            inputPlaceholder="NFT Title"
            containerStyle={styles.marginTop16}
          />
          <InputField
            labelName="Bio"
            value={description}
            onFieldChange={setDescription}
            inputPlaceholder="Enter NFT Description"
            multiline
            numberOfLines={Platform.OS === 'ios' ? null : 10}
            minHeight={Platform.OS === 'ios' ? 200 : null}
            inputStyle={styles.paddingTop16}
            containerStyle={styles.marginTop16}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNFTDetails;
