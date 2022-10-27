import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import LocationIcon from '@assets/icons/location.svg';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const BACKGROUND_COLOR = '#21212b';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#21212b',
  },
  centerHorVert: {
    justifyContent: 'center',
    marginHorizontal: 50,
    marginBottom: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  locationICon: {
    marginHorizontal: 10,
  },
});

const LocationHeader = (setLocation) => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // console.log('Permission to access location was denied');
        // TODO ALERT
      }
    })();
  }, []);

  const fetchLocation = async () => {
    if (await Location.hasServicesEnabledAsync()) {
      const locationn = await Location.getCurrentPositionAsync({});
      const morada = await Location.reverseGeocodeAsync(locationn.coords);
      setLocation(morada);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.centerHorVert}
          onPress={() => fetchLocation()}
        >
          <LocationIcon style={styles.locationICon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerHorVert}>
          <Text style={styles.button}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerHorVert}>
          <Text style={styles.button} onPress={navigation.goBack}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

LocationHeader.propTypes = {};

export default LocationHeader;
