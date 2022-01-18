import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from '@library';
import styles from './styles';
import Carousel from '../carousel';
import Login from './login';

const Start = ({ navigation }) => (
  <SafeAreaView style={styles.mainView}>
    <StatusBar style="light" />
    <View style={styles.slider}>
      <Carousel />
    </View>
    <Button
      text="Connect your wallet"
      onPress={() => { }}
      buttonStyle={styles.connectButton}
    />
    <Button
      text="Explore"
      onPress={() => { }}
      buttonStyle={styles.exploreButton}
    />
    <Login navigation={navigation} />
  </SafeAreaView>
);

Start.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Start;
