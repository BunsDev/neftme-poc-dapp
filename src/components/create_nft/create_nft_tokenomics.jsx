import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { Button, CustomTextInput, InputField } from '@library';
import Slider from '@react-native-community/slider';
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
  priceInput: {
    fontSize: 56,
    paddingVertical: 54.5,
    textAlign: 'center',
  },
  marginTop16: {
    marginTop: 16,
  },
  sliderContainer: {
    marginVertical: 32,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: '78%',
    height: 40,
  },
  percentageInput: {
    width: '18%',
    textAlign: 'center',
    paddingVertical: 16,
    marginTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
});

const CreateNFTTokenomics = () => {
  const route = useRoute();
  const [price, setPrice] = useState('');
  const [communityPercentage, setCommunityPercentage] = useState(0);
  const postNft = async () => {
    const filename = route.params.nft.image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image';

    const formData = new FormData();
    formData.append('title', route.params.nft.title);
    formData.append('description', route.params.nft.description);
    formData.append('price', price);
    formData.append('communityPercentage', communityPercentage);
    formData.append('image', { uri: route.params.nft.image, name: filename, type });

    const res = await fetch('http://192.168.1.101:3000/nft', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    res.url;
  };

  return (
    <View style={styles.container}>
      <Header showNext={false} onPress={null} step={3} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <InputField
            labelName="Sale Price in NEFTS"
            value={price}
            onFieldChange={setPrice}
            inputPlaceholder="0"
            keyboardType="numeric"
            inputStyle={styles.priceInput}
            containerStyle={styles.marginTop16}
          />
          <View style={styles.sliderContainer}>
            <Text style={styles.labelStyle}>Percentage for community</Text>
            <View style={styles.percentageContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                value={communityPercentage}
                onValueChange={(v) => setCommunityPercentage(Math.round(v))}
                minimumTrackTintColor="#F6C138"
                thumbTintColor="#F6C138"
                maximumTrackTintColor="#F0F0F0"
              />
              <CustomTextInput
                inputStyle={styles.percentageInput}
                value={`${communityPercentage}%`}
                inputPlaceholder=""
                keyboardType="numeric"
                onChangeText={(text) => setCommunityPercentage(text.replace('%', ''))}
              />
            </View>
          </View>
          <Button
            text="Mint NFT"
            buttonStyle={price ? {} : { backgroundColor: '#41414A' }}
            onPress={postNft}
            textStyle={{}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNFTTokenomics;
