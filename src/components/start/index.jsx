import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Button, StatusBar } from '@library';
import { getData } from '@services/storage';
import styles from './styles';
import Carousel from '../carousel';
import InstagramLogin from '../instagram_login';

const Start = ({ navigation }) => {
  useEffect(async () => {
    if (await getData('auth_token')) {
      navigation.navigate('Wallet');
    }
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor="#100F12" />
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
