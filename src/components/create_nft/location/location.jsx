import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import LocationHeader from './location_header';

const BACKGROUND_COLOR = '#21212b';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
  centerHorVert: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 19,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    margin: 16,
    color: '#fff',
  },
  marginX8: {
    marginHorizontal: 8,
  },
  pressBtn: {
    color: '#F6C138',
  },
  noPressBtn: {
    color: 'rgba(255, 255, 255, 0.22)',
  },
});

const LocationNFT = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
      } catch (err) {
        console.log(err);
      }

      const locationn = await Location.getCurrentPositionAsync({});
      const morada = await Location.reverseGeocodeAsync(locationn.coords);
      setLocation(morada);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LocationHeader />
    </View>
  );
};

LocationNFT.propTypes = {};

export default LocationNFT;
