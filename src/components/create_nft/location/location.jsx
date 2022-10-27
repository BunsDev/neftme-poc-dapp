import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import LocationHeader from './location_header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
});

const LocationNFT = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LocationHeader setLocation={setLocation} />
    </View>
  );
};

LocationNFT.propTypes = {};

export default LocationNFT;
