import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '@library';
import { getData } from '@services/storage';
import styles from './styles';
import Carousel from '../carousel';
import InstagramLogin from '../instagram_login';

const Start = ({ navigation }) => {
  useEffect(async () => {
    const auth = await getData('auth_token');
    if (auth) {
      navigation.navigate('Home');
    }
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar style="light" />
      <View style={styles.slider}>
        <Carousel />
      </View>
      <View style={styles.buttonsContainer}>
        <InstagramLogin navigation={navigation} />
        <Button
          text="Explore"
          onPress={() => { }}
          buttonStyle={styles.exploreButton}
        />
      </View>
    </SafeAreaView>
  );
};

Start.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Start;
